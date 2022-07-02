import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Element, ElementType } from "../entities/Element";
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
    if (!checkPermissions(element.canViewGroups, payload?.user)) {
      throw new Error("Not authorized");
    }

    element.children = await Promise.all(
      element.children.map((child) =>
        Element.findOneOrFail(child.id, {
          relations: [
            "createdBy",
            "parent",
            "canEditGroups",
            "canViewGroups",
            "canInteractGroups",
          ],
        })
      )
    );

    // Now filter out the elements that the user can't see
    element.children = element.children.filter((child) =>
      checkPermissions(child.canViewGroups, payload?.user)
    );
    return element;
  }

  @Query(() => [Element])
  @UseMiddleware()
  async getParentPages(): Promise<Element[]> {
    const elements = await Element.find({
      where: { type: ElementType.Page, parent: null },
      relations: [
        "createdBy",
        "parent",
        "children",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });
    return elements;
  }

  @Query(() => [Element])
  @UseMiddleware()
  async getDatabases(): Promise<Element[]> {
    return await Element.find({
      where: { type: ElementType.Database },
      relations: [
        "createdBy",
        "parent",
        "children",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });
  }

  @Query(() => Element)
  @UseMiddleware()
  async getDatabase(@Arg("databaseId") elementId: number): Promise<Element> {
    return await Element.findOneOrFail(
      { id: elementId, type: ElementType.Database },
      {
        relations: [
          "createdBy",
          "parent",
          "children",
          "canEditGroups",
          "canViewGroups",
          "canInteractGroups",
        ],
      }
    );
  }

  @Mutation(() => Element, { nullable: true })
  @UseMiddleware(isAuth)
  async createElement(
    @Ctx() { payload }: MyContext,
    @Arg("props", () => GraphQLJSONObject) props: object,
    @Arg("type", () => ElementType) type: ElementType,
    @Arg("index") index: number,
    @Arg("parent", { nullable: true }) parentId?: number
  ): Promise<Element | null> {
    const element = new Element();
    element.props = props;
    element.type = type;
    if (parentId && parentId !== null) {
      element.parent = await Element.findOneOrFail(parentId, {
        relations: [
          "createdBy",
          "parent",
          "children",
          "canEditGroups",
          "canViewGroups",
          "canInteractGroups",
        ],
      });
      element.canEditGroups = element.parent.canEditGroups;
      element.canViewGroups = element.parent.canViewGroups;
      element.canInteractGroups = element.parent.canInteractGroups;
    } else {
      element.canEditGroups = [];
      element.canViewGroups = [];
      element.canInteractGroups = [];
    }

    if (!payload?.userId) {
      throw new Error("Not authenticated");
    }

    const user = await User.findOneOrFail(payload.userId, {
      relations: ["groups"],
    });

    if (parentId && parentId !== null) {
      if (!checkPermissions(element.canEditGroups, user)) {
        throw new Error("Not authorized");
      }
    } else {
      if (user.role !== "exec") {
        throw new Error("Not authorized");
      }
    }

    element.index = index;
    element.createdBy = user;
    element.children = [];

    if (element.parent?.type === ElementType.Database) {
      // Need to ensure element has all props of parent database

      Object.keys((element.parent.props as any).attributes.value).map(
        (attributeName: string) => {
          const attribute = (element.parent!.props as any).attributes.value[
            attributeName
          ];
          if (!(element.props as any)[attributeName]) {
            (element.props as any)[attributeName] = attribute;
          }
        }
      );
    }

    await element.save();
    return element ? element : null;
  }

  @Mutation(() => Element)
  @UseMiddleware(isAuth)
  async editElementProps(
    @Ctx() { payload }: MyContext,
    @Arg("elementId") elementId: number,
    @Arg("props", () => GraphQLJSONObject) props: object
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

    if (!payload?.userId) {
      throw new Error("Not authenticated");
    }

    const user = await User.findOneOrFail(payload.userId, {
      relations: ["groups"],
    });
    if (!checkPermissions(element.canEditGroups, user)) {
      throw new Error("Not authorized");
    }

    element.props = { ...element.props, ...props };

    if (element.type === ElementType.Database) {
      // Need to ensure all content has same attributes

      element.children.forEach((child) => {
        Object.keys((element.props as any).attributes.value).map(
          (attributeName: string) => {
            const attribute = (element.props as any).attributes.value[
              attributeName
            ];
            if (!(child.props as any)[attributeName]) {
              (child.props as any)[attributeName] = attribute;
            }
          }
        );
        child.save();
      });
    }

    await element.save();
    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware()
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

    if (!payload?.userId) {
      throw new Error("Not authenticated");
    }

    const users = await User.findOneOrFail(payload.userId, {
      relations: ["groups"],
    });
    if (!checkPermissions(element.canEditGroups, users)) {
      throw new Error("Not authorized");
    }
    element.index = index;

    await element.save();
    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware()
  async editElementParent(
    @Arg("elementId") elementId: number,
    @Arg("parentId") parentId: number
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
    const parent = await Element.findOneOrFail(parentId, {
      relations: [
        "createdBy",
        "parent",
        "children",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });
    element.parent = parent;

    await element.save();
    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware()
  async removeElement(@Arg("elementId") elementId: number): Promise<Element> {
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
    await element.remove();
    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware()
  async updatePermissions(
    @Arg("elementId") elementId: number,
    @Arg("canEditGroups", () => [Number], { nullable: true })
    canEditGroups?: number[],
    @Arg("canViewGroups", () => [Number], { nullable: true })
    canViewGroups?: number[],
    @Arg("canInteractGroups", () => [Number], { nullable: true })
    canInteractGroups?: number[]
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
