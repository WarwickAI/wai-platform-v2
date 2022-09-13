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
import { getAuth, getUser, isAdmin, isAuth, isExec, isSuper } from "../isAuth";
import { group } from "console";

@Resolver()
export class ElementResolver {
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
    @Arg("elementId") elementId: number
  ): Promise<Element> {
    const element = await Element.getElementByIdWithChildren(elementId);

    if (!checkPermissions(element.canViewGroups, payload?.user)) {
      throw new Error("Not authorized");
    }

    // Now filter out the elements that the user can't see
    element.children = element.children.filter((child) =>
      checkPermissions(child.canViewGroups, payload?.user)
    );
    return element;
  }

  @Query(() => [Element])
  @UseMiddleware(getAuth, getUser)
  async getParentPages(@Ctx() { payload }: MyContext): Promise<Element[]> {
    const elements = await Element.getElementsWithChildren({
      where: {
        type: "Page",
        parent: null,
      },
    });

    // Now filter out the elements and children that the user can't see
    const filteredElements = elements.filter((element) =>
      checkPermissions(element.canViewGroups, payload?.user)
    );

    filteredElements.forEach((element) => {
      element.children = element.children.filter((child) =>
        checkPermissions(child.canViewGroups, payload?.user)
      );
    });

    return filteredElements;
  }

  @Query(() => [Element])
  @UseMiddleware(getAuth, getUser)
  async getDatabases(@Ctx() { payload }: MyContext): Promise<Element[]> {
    const elements = await Element.getElementsWithChildren({
      where: { type: "Database" },
    });

    // Now filter out the elements and children that the user can't see
    const filteredElements = elements.filter((element) =>
      checkPermissions(element.canViewGroups, payload?.user)
    );

    filteredElements.forEach((element) => {
      element.children = element.children.filter((child) =>
        checkPermissions(child.canViewGroups, payload?.user)
      );
    });

    return filteredElements;
  }

  @Query(() => [Element])
  @UseMiddleware(getAuth, getUser)
  async getTemplates(@Ctx() { payload }: MyContext): Promise<Element[]> {
    const elements = await Element.getElementsWithChildren({
      where: { type: "Template" },
    });

    // Now filter out the elements and children that the user can't see
    const filteredElements = elements.filter((element) =>
      checkPermissions(element.canViewGroups, payload?.user)
    );

    filteredElements.forEach((element) => {
      element.children = element.children.filter((child) =>
        checkPermissions(child.canViewGroups, payload?.user)
      );
    });

    return filteredElements;
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
    const element = new Element();
    element.data = data;
    element.type = type;

    const adminGroup = await Group.findOneOrFail({
      where: { name: "Admin" },
    });

    const allGroup = await Group.findOneOrFail({
      where: { name: "All" },
    });

    if (parentId && parentId !== null) {
      element.parent = await Element.findOneOrFail(parentId, {
        relations: [
          "createdBy",
          "parent",
          "children",
          "canModifyPermsGroups",
          "canEditGroups",
          "canViewGroups",
          "canInteractGroups",
        ],
      });
      element.canModifyPermsGroups = element.canModifyPermsGroups || [
        adminGroup,
      ];
      element.canEditGroups = element.parent.canEditGroups || [adminGroup];
      element.canViewGroups = element.parent.canViewGroups || [adminGroup];
      element.canInteractGroups = element.parent.canInteractGroups || [
        adminGroup,
      ];
    } else {
      element.canModifyPermsGroups = [adminGroup];
      element.canEditGroups =
        element.type === "Database" ? [allGroup] : [adminGroup];
      element.canViewGroups =
        element.type === "Database" ? [allGroup] : [adminGroup];
      element.canInteractGroups =
        element.type === "Database" ? [allGroup] : [adminGroup];
    }

    // Check user has permissions to edit parent (i.e. add an element to it)
    if (!checkPermissions(element.canEditGroups, payload?.user)) {
      throw new Error("Not authorized");
    }

    element.index = index;
    element.createdBy = payload.user;
    element.children = [];

    if (element.parent && element.parent?.type === "Database") {
      // Verify that the childrenBaseType of the database parent matches this new element's type
      if ((element.parent.data as any).childrenBaseType.value !== type) {
        throw new Error(
          `Children base type of database (${
            (element.parent.data as any).childBaseType
          }) does not match new element's type (${type})`
        );
      }
      // Need to ensure element has all data of parent database

      Object.keys((element.parent.data as any).attributes.value).map(
        (attributeName: string) => {
          const attribute = (element.parent!.data as any).attributes.value[
            attributeName
          ];
          if (!(element.data as any)[attributeName]) {
            (element.data as any)[attributeName] = attribute;
          }
        }
      );

      // Need to add the template if it exists
      if (
        (element.parent.data as any).template?.value &&
        (element.parent.data as any).template?.value !== -1
      ) {
        const templateElement = await Element.getElementByIdWithChildren(
          (element.parent.data as any).template.value
        );
        // Copy the templates children
        element.children = await Promise.all(
          templateElement.children.map(async (child) => {
            const {
              id,
              children,
              parent,
              createdAt,
              updatedAt,
              createdBy,
              ...childInfo
            } = child;
            const newChild = Element.create({ ...childInfo });
            newChild.canModifyPermsGroups = element.parent
              ?.canModifyPermsGroups || [adminGroup];
            newChild.canEditGroups = element.parent?.canEditGroups || [
              adminGroup,
            ];
            newChild.canViewGroups = element.parent?.canViewGroups || [
              adminGroup,
            ];
            newChild.canInteractGroups = element.parent?.canInteractGroups || [
              adminGroup,
            ];
            newChild.createdBy = payload.user!; // Will exists, we did the check earlier

            await newChild.save();
            return newChild;
          })
        );
      }
    }

    if (type === "Survey") {
      // Add the user attribute
      (element.data as any).user.value = payload.user.id;
    }

    await element.save();
    return element ? element : null;
  }

  @Mutation(() => Element)
  @UseMiddleware(isAuth, getUser)
  async editElementData(
    @Ctx() { payload }: MyContext,
    @Arg("elementId") elementId: number,
    @Arg("data", () => GraphQLJSONObject) data: object
  ): Promise<Element> {
    const element = await Element.getElementByIdWithChildren(elementId);

    if (!checkPermissions(element.canEditGroups, payload?.user)) {
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
    const element = await Element.getElementByIdWithChildren(elementId);

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
      relations: [
        "createdBy",
        "parent",
        "children",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
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
    return element;
  }

  // @Mutation(() => Element)
  // @UseMiddleware(getAuth, getUser)
  // async editElementParent(
  //   @Ctx() { payload }: MyContext,
  //   @Arg("elementId") elementId: number,
  //   @Arg("parentId") parentId: number
  // ): Promise<Element> {
  //   const element = await Element.findOneOrFail(elementId, {
  //     relations: [
  //       "createdBy",
  //       "parent",
  //       "children",
  //       "canEditGroups",
  //       "canViewGroups",
  //       "canInteractGroups",
  //     ],
  //   });
  //   const parent = await Element.findOneOrFail(parentId, {
  //     relations: [
  //       "createdBy",
  //       "parent",
  //       "children",
  //       "canEditGroups",
  //       "canViewGroups",
  //       "canInteractGroups",
  //     ],
  //   });
  //   element.parent = parent;

  //   await element.save();
  //   return element;
  // }

  @Mutation(() => Element)
  @UseMiddleware(isAuth, getUser)
  async removeElement(
    @Ctx() { payload }: MyContext,
    @Arg("elementId") elementId: number
  ): Promise<Element> {
    const element = await Element.findOneOrFail(elementId, {
      relations: [
        "createdBy",
        "parent",
        "children",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });
    // Check have permission to remove, if no parent then check user is admin
    if (
      !checkPermissions(element.canEditGroups, payload?.user) ||
      (!element.parent &&
        payload?.user?.groups.findIndex((g) => g.name === "Admin") !== -1)
    ) {
      throw new Error("Not authorized");
    }
    await element.remove();
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
    const element = await Element.getElementByIdWithChildren(elementId);

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
    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware(getAuth, getUser)
  async inheritDatabaseAttributes(
    @Ctx() { payload }: MyContext,
    @Arg("databaseId") databaseId: number,
    @Arg("elementId") elementId: number
  ): Promise<Element> {
    const database = await Element.getElementByIdWithChildren(databaseId);
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
}

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
