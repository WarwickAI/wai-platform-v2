import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Element } from "../entities/Element";
import { User } from "../entities/User";
import { MyContext } from "../../src/types";
import { GraphQLJSONObject } from "graphql-type-json";
import { Group } from "../entities/Group";
import { getAuth, getUser, isAdmin, isAuth } from "../isAuth";
import { getDefaultGroups, getUserGroup } from "../utils/defaultGroups";
import { FindConditions, FindManyOptions, FindOneOptions } from "typeorm";

const GROUP_REALATIONS = [
  "canModifyPermsGroups",
  "canEditGroups",
  "canViewGroups",
  "canInteractGroups",
];

const ALL_RELATIONS_BUT_CHILDREN = [...GROUP_REALATIONS, "createdBy", "parent"];

const ALL_RELATIONS = [...ALL_RELATIONS_BUT_CHILDREN, "children"];

const ALL_CHILD_RELATIONS = ALL_RELATIONS_BUT_CHILDREN.map(
  (relation) => "children." + relation
);

const ALL_RELATIONS_AND_CHILD_RELATIONS = [
  ...ALL_RELATIONS,
  ...ALL_CHILD_RELATIONS,
];

@Resolver()
export class ElementResolver {
  // Query and return elements
  // Requires logged in user -> No
  @Query(() => [Element])
  @UseMiddleware(getAuth, getUser)
  async getElements(
    @Ctx() { payload }: MyContext,
    @Arg("type", { nullable: true }) type?: string,
    @Arg("parentId", { nullable: true }) parentId?: number,
    @Arg("children", { defaultValue: true }) children?: boolean
  ): Promise<Element[]> {
    const user = payload?.user;

    var filter: FindConditions<Element> | undefined;
    if (type) {
      filter = { ...filter, type };
    }

    // parentId could be null (i.e. no parent), so check for undefined
    if (parentId !== undefined) {
      filter = { ...filter, parent: { id: parentId } };
    }

    var elements = await Element.find({
      where: filter,
      relations: children
        ? ALL_RELATIONS_AND_CHILD_RELATIONS
        : ALL_RELATIONS_BUT_CHILDREN,
    });

    // Filter out elements that the user can't see
    elements = elements.filter((element) =>
      checkPermissions(element.canViewGroups, user)
    );

    // If we have children, filter out the children that the user can't see
    if (children) {
      elements.forEach((element) => {
        element.children = element.children.filter((child) =>
          checkPermissions(child.canViewGroups, user)
        );
      });
    } else {
      // Must add empty array to children to avoid error
      elements.forEach((element) => {
        element.children = [];
      });
    }

    return elements;
  }

  @Query(() => [Element])
  @UseMiddleware(getAuth, getUser)
  async getElementsNoChildren(
    @Ctx() { payload }: MyContext
  ): Promise<Element[]> {
    // First get all the elements, but don't include children
    const elements = await Element.find({
      relations: [
        "createdBy",
        "parent",
        "canModifyPermsGroups",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });

    // Now filter out the elements that the user can't see
    elements.filter((element) =>
      checkPermissions(element.canViewGroups, payload?.user)
    );
    return elements;
  }

  @Query(() => Element)
  @UseMiddleware(getAuth, getUser)
  async getElement(
    @Ctx() { payload }: MyContext,
    @Arg("elementId") elementId: number,
    @Arg("children", { defaultValue: true }) children?: boolean
  ): Promise<Element> {
    const user = payload?.user;

    var element = await Element.findOneOrFail({
      where: { id: elementId },
      relations: children
        ? ALL_RELATIONS_AND_CHILD_RELATIONS
        : ALL_RELATIONS_BUT_CHILDREN,
    });

    // Check that the user can see this element
    if (!checkPermissions(element.canViewGroups, user)) {
      throw new Error("Not authorized");
    }

    // If we have children, filter out the children that the user can't see
    if (children) {
      element.children = element.children.filter((child) =>
        checkPermissions(child.canViewGroups, user)
      );
    } else {
      // Must add empty array to children to avoid error
      element.children = [];
    }

    return element;
  }

  @Mutation(() => Element, { nullable: true })
  @UseMiddleware(isAuth, getUser)
  async createElement(
    @Ctx() { payload }: MyContext,
    @Arg("data", () => GraphQLJSONObject) data: object,
    @Arg("type") type: string,
    @Arg("index") index: number,
    @Arg("parent", { nullable: true }) parentId?: number
  ): Promise<Element | null> {
    // Check logged in (must be logged in to create an element)
    if (!payload || !payload.user) {
      throw new Error("Not logged in");
    }

    return await addElement(data, type, parentId, index, payload.user);
  }

  @Mutation(() => Element)
  @UseMiddleware(isAuth, getUser)
  async editElementData(
    @Ctx() { payload }: MyContext,
    @Arg("elementId") elementId: number,
    @Arg("data", () => GraphQLJSONObject) data: object
  ): Promise<Element> {
    const user = payload?.user;
    if (!user) {
      throw new Error("Not logged in");
    }

    const element = await Element.findOneOrFail(elementId, {
      relations: ALL_RELATIONS_AND_CHILD_RELATIONS,
    });

    if (
      !(
        element.type === "Survey" &&
        checkDataLinkEditPermissions(element, data, user)
      ) &&
      !checkPermissions(element.canEditGroups, user)
    ) {
      throw new Error("Not authorized");
    }

    // Update element with new data
    element.data = { ...element.data, ...data };

    if (element.type === "Database") {
      element.children.forEach((child) => {
        if (!checkPermissions(child.canEditGroups, payload?.user)) {
          return;
        }
        // Check child is not missing attributes
        Object.keys((element.data as any).attributes.value).forEach(
          (attributeName: string) => {
            const attribute = (element.data as any).attributes.value[
              attributeName
            ];
            if (!(child.data as any)[attributeName]) {
              (child.data as any)[attributeName] = attribute;
            }
          }
        );
        // Check child doesn't have extra attributes
        Object.keys(child.data).forEach((attributeName: string) => {
          if (!(element.data as any).attributes.value[attributeName]) {
            delete (child.data as any)[attributeName];
          }
        });
        child.save();
      });
    }

    // Now filter out the elements that the user can't see
    element.children = element.children.filter((child) =>
      checkPermissions(child.canViewGroups, payload?.user)
    );

    // If we updated the template for a database, make sure it has
    // all the attributes of the database
    if (element.type === "Database" && (data as any).template?.value) {
      const templateElement = await Element.findOneOrFail(
        { id: (data as any).template.value, type: "Template" },
        { relations: GROUP_REALATIONS }
      );

      if (!templateElement) {
        throw new Error("Template not found");
      }

      // Check we can actually edit the template (should in most cases)
      if (!checkPermissions(templateElement.canEditGroups, payload?.user)) {
        throw new Error("Not authorized to edit template");
      }

      // Check template is not missing attributes
      Object.keys((element.data as any).attributes.value).forEach(
        (attributeName: string) => {
          const attribute = (element.data as any).attributes.value[
            attributeName
          ];
          if (!(templateElement.data as any)[attributeName]) {
            (templateElement.data as any)[attributeName] = attribute;
          }
        }
      );

      // To-Do: Check template doesn't have extra attributes,
      // not sure how to resolve this since other uses of the template
      // may use the extra attributes

      templateElement.save();
    }

    await element.save();
    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware(isAuth, getUser)
  async editDatabaseAttributeName(
    @Ctx() { payload }: MyContext,
    @Arg("elementId") elementId: number,
    @Arg("attributeName") attributeName: string,
    @Arg("newAttributeName") newAttributeName: string
  ): Promise<Element> {
    const element = await Element.findOneOrFail(elementId, {
      relations: ALL_RELATIONS_AND_CHILD_RELATIONS,
    });

    if (element.type !== "Database") {
      throw new Error("Not a database");
    }

    if (!checkPermissions(element.canEditGroups, payload?.user)) {
      throw new Error("Not authorized");
    }

    Object.keys((element.data as any).attributes.value).forEach((attName) => {
      if (attName === newAttributeName) {
        throw new Error("Attribute name already exists");
      }
    });

    const oldAttribute = (element.data as any).attributes.value[attributeName];
    if (!oldAttribute) {
      throw new Error("Attribute does not exist");
    }

    (element.data as any).attributes.value[newAttributeName] = oldAttribute;
    delete (element.data as any).attributes.value[attributeName];

    // Update children with new attribute name
    element.children.forEach((child) => {
      if (!checkPermissions(child.canEditGroups, payload?.user)) {
        return;
      }

      (child.data as any)[newAttributeName] = (child.data as any)[
        attributeName
      ];
      delete (child.data as any)[attributeName];
      child.save();
    });

    element.save();

    // Now filter out the elements that the user can't see
    element.children = element.children.filter((child) =>
      checkPermissions(child.canViewGroups, payload?.user)
    );

    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware(isAuth, getUser)
  async editElementIndex(
    @Ctx() { payload }: MyContext,
    @Arg("elementId") elementId: number,
    @Arg("index") index: number
  ): Promise<Element> {
    const element = await Element.findOneOrFail(elementId, {
      relations: ALL_RELATIONS_AND_CHILD_RELATIONS,
    });

    if (!checkPermissions(element.canEditGroups, payload?.user)) {
      throw new Error("Not authorized");
    }

    const parent = await Element.findOneOrFail(
      element.parent ? element.parent.id : -1,
      {
        relations: ["canEditGroups"],
      }
    );

    if (parent) {
      if (!checkPermissions(parent.canEditGroups, payload?.user)) {
        throw new Error("Not authorized");
      }
    } else {
      throw new Error("Parent does not exist");
    }

    element.index = index;

    await element.save();

    // Now filter out the elements that the user can't see
    element.children = element.children.filter((child) =>
      checkPermissions(child.canViewGroups, payload?.user)
    );

    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware(isAuth, getUser)
  async removeElement(
    @Ctx() { payload }: MyContext,
    @Arg("elementId") elementId: number
  ): Promise<Element> {
    const user = payload?.user;
    if (!user) {
      throw new Error("Not authorized");
    }

    const element = await Element.findOneOrFail(elementId, {
      relations: ALL_RELATIONS,
    });
    // Check have permission to remove, if no parent then check user is admin
    if (
      !checkPermissions(element.canEditGroups, payload?.user) ||
      (!element.parent &&
        user.groups.findIndex((g) => g.name === "Admin") === -1)
    ) {
      throw new Error("Not authorized");
    }
    await removeElement(element, user);
    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware(getAuth, getUser)
  async updatePermissions(
    @Ctx() { payload }: MyContext,
    @Arg("elementId") elementId: number,
    @Arg("canModifyPermsGroups", () => [Number], { nullable: true })
    canModifyPermsGroups?: number[],
    @Arg("canEditGroups", () => [Number], { nullable: true })
    canEditGroups?: number[],
    @Arg("canViewGroups", () => [Number], { nullable: true })
    canViewGroups?: number[],
    @Arg("canInteractGroups", () => [Number], { nullable: true })
    canInteractGroups?: number[]
  ): Promise<Element> {
    const element = await Element.findOneOrFail(elementId, {
      relations: ALL_RELATIONS_AND_CHILD_RELATIONS,
    });

    if (!checkPermissions(element.canModifyPermsGroups, payload?.user)) {
      throw new Error("Not authorized");
    }

    if (canModifyPermsGroups) {
      const groups = await Group.findByIds(canModifyPermsGroups);
      element.canModifyPermsGroups = groups;
    }
    if (canEditGroups) {
      const groups = await Group.findByIds(canEditGroups);
      element.canEditGroups = groups;
    }
    if (canViewGroups) {
      const groups = await Group.findByIds(canViewGroups);
      element.canViewGroups = groups;
    }
    if (canInteractGroups) {
      const groups = await Group.findByIds(canInteractGroups);
      element.canInteractGroups = groups;
    }
    await element.save();

    // Now filter out the elements that the user can't see
    element.children = element.children.filter((child) =>
      checkPermissions(child.canViewGroups, payload?.user)
    );

    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware(getAuth, getUser)
  async inheritDatabaseAttributes(
    @Ctx() { payload }: MyContext,
    @Arg("databaseId") databaseId: number,
    @Arg("elementId") elementId: number
  ): Promise<Element> {
    const database = await Element.findOneOrFail(databaseId, {
      relations: ALL_RELATIONS_AND_CHILD_RELATIONS,
    });
    if (database.type !== "Database") {
      throw new Error("Database not found");
    }

    if (!checkPermissions(database.canViewGroups, payload?.user)) {
      throw new Error("Not authorized");
    }

    const element = await Element.getElementByIdWithChildren(elementId);

    if (!checkPermissions(element.canEditGroups, payload?.user)) {
      throw new Error("Not authorized");
    }

    Object.keys((database.data as any).attributes.value).forEach((attName) => {
      if (!(element.data as any)[attName]) {
        (element.data as any)[attName] = (
          database.data as any
        ).attributes.value[attName];
      }
    });

    await element.save();

    // Now filter out the elements that the user can't see
    element.children = element.children.filter((child) =>
      checkPermissions(child.canViewGroups, payload?.user)
    );

    return element;
  }

  @Query(() => Element, { nullable: true })
  @UseMiddleware(getAuth, getUser)
  async getUserPage(
    @Ctx() { payload }: MyContext,
    @Arg("uniId") uniId: number
  ): Promise<Element | null> {
    const user = await User.findOneOrFail(
      { uniId: uniId },
      {
        relations: ["page"],
      }
    );

    const page = await Element.findOneOrFail(user.page.id, {
      relations: ["canViewGroups"],
    });

    if (!checkPermissions(page.canViewGroups, payload?.user)) {
      throw new Error("Not authorized");
    }
    return user.page;
  }

  @Mutation(() => Element, { nullable: true })
  @UseMiddleware(isAuth, getUser, isAdmin)
  async assignUserPage(
    @Arg("uniId") uniId: number,
    @Arg("pageId") pageId: number
  ): Promise<Element | null> {
    const user = await User.findOneOrFail(
      { uniId: uniId },
      {
        relations: ["page"],
      }
    );
    const page = await Element.findOneOrFail(pageId, {
      relations: ["user"],
    });
    user.page = page;
    await user.save();
    return page;
  }

  @Mutation(() => Element)
  @UseMiddleware(isAuth, getUser)
  async handleAction(
    @Ctx() { payload }: MyContext,
    @Arg("buttonId") buttonId: number
  ): Promise<Element> {
    const user = payload?.user;
    if (!user) {
      throw new Error("Not authorized");
    }

    const button = await Element.findOneOrFail(
      { id: buttonId, type: "Button" },
      {
        relations: ["parent", "children", "canInteractGroups"],
      }
    );

    if (!checkPermissions(button.canInteractGroups, user)) {
      throw new Error("Not authorized");
    }

    const actionType = (button.data as any).action.value;

    if (!actionType) {
      throw new Error("Button has no action type");
    }

    if (actionType === "Add" || actionType === "StartSurvey") {
      if (!(button.data as any).database) {
        throw new Error("Button does not have a database attribute");
      }

      const database = await Element.findOneOrFail(
        {
          id: (button.data as any).database.value,
          type: "Database",
        },
        { relations: ALL_RELATIONS }
      );

      return await addElement(
        {},
        (database.data as any).childrenBaseType.value,
        database.id,
        0,
        user
      );
    }

    throw new Error("Action not supported");
  }
}

const addElement = async (
  data: any,
  type: string,
  parentId: number | undefined,
  index: number,
  user: User
) => {
  // First create the new element
  const element = new Element();
  element.data = data;
  element.type = type;
  element.index = index;
  element.children = [];
  element.createdBy = user;

  if (parentId) {
    element.parent = await Element.findOneOrFail(parentId, {
      relations: ALL_RELATIONS_AND_CHILD_RELATIONS,
    });
  }

  // Get and set the element's default permissions
  const {
    canModifyPermsGroups,
    canEditGroups,
    canViewGroups,
    canInteractGroups,
  } = await createElementInitialGroups(type, element.parent, user);

  element.canModifyPermsGroups = canModifyPermsGroups;
  element.canEditGroups = canEditGroups;
  element.canViewGroups = canViewGroups;
  element.canInteractGroups = canInteractGroups;

  // Check user has permissions to create this element (i.e. edit itself)
  if (!checkPermissions(element.canEditGroups, user)) {
    throw new Error("Not authorized to create this element");
  }

  // Check that if the new element is a survey, that the database of surveys
  // does not yet have a response for that user
  if (type === "Survey") {
    if (element.parent?.type !== "Database") {
      throw new Error("Survey must be added to a database");
    }

    const database = element.parent;

    database.children.forEach((surveyResponse) => {
      if ((surveyResponse.data as any).user.value === user.id) {
        throw new Error("User has already responded to this survey");
      }
    });
  }

  // If the element is being added to a database, ensure:
  // 1. The new element type matches the database type
  // 2. The new element has the same attributes as the database
  // 3. The element is intialised with the template (if exists)
  if (element.parent?.type === "Database") {
    const database = element.parent;
    if ((database.data as any).childrenBaseType.value !== type) {
      throw new Error("Element type does not match database type");
    }

    // Loop through database attributes and add them to the data of the new element
    Object.keys((database.data as any).attributes.value).map(
      (attributeName: string) => {
        const attribute = (database.data as any).attributes.value[
          attributeName
        ];
        if (!(element.data as any)[attributeName]) {
          (element.data as any)[attributeName] = attribute;
        }
      }
    );

    // Initialise the element with the template (if exists)
    if ((database.data as any).template?.value !== -1) {
      const template = await Element.getElementByIdWithChildren(
        (database.data as any).template.value
      );

      if (!template) {
        throw new Error("Template not found");
      }

      // Add copies of template children to the new element
      const children = await Promise.all(
        template.children.map(async (templateChild) => {
          // Copy everything from the template child other than:
          // id, further children, parent, createdBy, createdAt, updatedAt
          const {
            id,
            children,
            parent,
            createdBy,
            createdAt,
            updatedAt,
            ...templateChildData
          } = templateChild;

          const copyChild = Element.create({ ...templateChildData });

          // Overwrite permissions with the new element's permissions (i.e. child matches parents permissions)
          copyChild.canModifyPermsGroups = element.canModifyPermsGroups;
          copyChild.canEditGroups = element.canEditGroups;
          copyChild.canInteractGroups = element.canInteractGroups;
          copyChild.canViewGroups = element.canViewGroups;

          copyChild.createdBy = user;

          await copyChild.save();
          return copyChild;
        })
      );

      element.children = children;
    }
  }

  // If the element is a survey, we should add the user ID
  if (type === "Survey") {
    // Add the user attribute
    (element.data as any).user.value = user.id;
  }

  await element.save();
  return element;
};

// Recursively delete elements
const removeElement = async (element: Element, user: User) => {
  element.children.forEach(async (child) => {
    const childElement = await Element.findOneOrFail(child.id, {
      relations: ["children", ...GROUP_REALATIONS],
    });
    await removeElement(childElement, user);
  });
  console.log("Removing element", element);
  await element.remove();
};

const checkPermissions = (groups: Group[], user: User | undefined) => {
  for (const group of groups) {
    if (group.name === "All") {
      return true;
    }
  }
  if (!user) {
    return false;
  }
  for (const userGroup of user.groups) {
    if (userGroup.name === "Admin") {
      return true;
    }
  }
  for (const group of groups) {
    for (const userGroup of user.groups) {
      if (userGroup.id === group.id) {
        return true;
      }
    }
  }
  return false;
};

// Check if the user should be able to edit the fields they are attempting to, by checking:
// 1. The user can interact with the element
// 2. The user is not trying to change the type of any fields
// 3. All fields in the edit data have an editable data link that the user can interact with
const checkDataLinkEditPermissions = async (
  element: Element,
  data: any,
  user: User
) => {
  if (!checkPermissions(element.canInteractGroups, user)) {
    return false;
  }
  const editFields: {
    fieldName: string;
    changingType: boolean;
  }[] = Object.keys(data).map((key: string) => {
    return {
      fieldName: key,
      changingType: (element.data as any)[key].type !== data[key].type,
    };
  });

  for (const field of editFields) {
    if (field.changingType) {
      return false;
    }
  }

  for (const field of editFields) {
    var foundDataLink = false;
    for (const child of element.children) {
      if (
        child.type === "DataLink" &&
        (child.data as any).canEdit.value &&
        (child.data as any).property.value === field.fieldName
      ) {
        const childElement = await Element.findOneOrFail(child.id, {
          relations: ["canInteractGroups"],
        });

        if (checkPermissions(childElement.canInteractGroups, user)) {
          foundDataLink = true;
          break;
        }
      }
    }
    if (!foundDataLink) {
      return false;
    }
  }
  return true;
};

// Given the element type, parent and user, return the default groups for the element in order of
// canModifyPermsGroups, canEditGroups, canInteractGroups, canViewGroups
const createElementInitialGroups = async (
  type: string,
  parent: Element | undefined,
  user: User
) => {
  // Get relevant groups
  const { adminGroup } = await getDefaultGroups();

  var canModifyPermsGroups: Group[] = [],
    canEditGroups: Group[] = [],
    canInteractGroups: Group[] = [],
    canViewGroups: Group[] = [];

  // By default, always set the permissions to the same as the parent
  // if no parent, set to admin
  if (parent) {
    canModifyPermsGroups.push(...parent.canModifyPermsGroups);
    canEditGroups.push(...parent.canEditGroups);
    canInteractGroups.push(...parent.canInteractGroups);
    canViewGroups.push(...parent.canViewGroups);
  } else {
    canModifyPermsGroups.push(adminGroup);
    canEditGroups.push(adminGroup);
    canInteractGroups.push(adminGroup);
    canViewGroups.push(adminGroup);
  }

  // If the type is a database add the element author with edit, interact and view permissions
  if (type === "Database") {
    const userGroup = await getUserGroup(user);

    canEditGroups.push(userGroup);
    canInteractGroups.push(userGroup);
    canViewGroups.push(userGroup);
  }

  // If the type is a survey, set view and interact permissions to the user
  // Also add the database's groups to all permissions
  if (type === "Survey") {
    const userGroup = await getUserGroup(user);

    canInteractGroups.push(userGroup);
    canViewGroups.push(userGroup);
  }

  // Dedupe groups
  canModifyPermsGroups = uniqBy(canModifyPermsGroups, (i) => i.id);
  canEditGroups = uniqBy(canEditGroups, (i) => i.id);
  canInteractGroups = uniqBy(canInteractGroups, (i) => i.id);
  canViewGroups = uniqBy(canViewGroups, (i) => i.id);

  return {
    canModifyPermsGroups,
    canEditGroups,
    canInteractGroups,
    canViewGroups,
  };
};

const uniqBy = (a: any[], key: (item: any) => string) => {
  var seen: any = {};
  return a.filter(function (item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
};
