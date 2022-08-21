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
import { getAuth, getUser, isAuth, isExec, isSuper } from "../isAuth";

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
      element.canModifyPermsGroups = element.canModifyPermsGroups;
      element.canEditGroups = element.parent.canEditGroups;
      element.canViewGroups = element.parent.canViewGroups;
      element.canInteractGroups = element.parent.canInteractGroups;
    } else {
      element.canModifyPermsGroups = [];
      element.canEditGroups = [];
      element.canViewGroups = [];
      element.canInteractGroups = [];
    }

    // Check user has permissions to edit parent (i.e. add an element to it),
    // if parent does not exists, we have a special case
    if (
      !checkPermissions(element.canEditGroups, payload?.user) ||
      (!element.parent && payload!.user!.email !== "Edward.Upton@warwick.ac.uk")
    ) {
      throw new Error("Not authorized");
    }

    element.index = index;
    element.createdBy = payload.user;
    element.children = [];

    if (element.parent && element.parent?.type === "Database") {
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

      if ((element.parent.data as any).template?.value) {
        const templateElement = await Element.getElementByIdWithChildren(
          (element.parent.data as any).template.value
        );
        console.log(templateElement);
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
            newChild.canModifyPermsGroups =
              element.parent?.canModifyPermsGroups || [];
            newChild.canEditGroups = element.parent?.canEditGroups || [];
            newChild.canViewGroups = element.parent?.canViewGroups || [];
            newChild.canInteractGroups =
              element.parent?.canInteractGroups || [];
            newChild.createdBy = payload.user!; // Will exists, we did the check earlier

            await newChild.save();
            return newChild;
          })
        );
      }
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
    // Check have permission to remove
    if (
      !checkPermissions(element.canEditGroups, payload?.user) ||
      (!element.parent && payload!.user!.email !== "Edward.Upton@warwick.ac.uk")
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
  @UseMiddleware(isAuth, getUser)
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
  @UseMiddleware(isAuth, getUser)
  async assignUserPage(
    @Ctx() { payload }: MyContext,
    @Arg("uniId") uniId: number,
    @Arg("pageId") pageId: number
  ): Promise<Element | null> {
    if (payload?.user!.email !== "Edward.Upton@warwick.ac.uk") {
      throw new Error("Not authorized");
    }

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
  if (groups.length === 0) {
    return true;
  }
  if (!user) {
    return false;
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
