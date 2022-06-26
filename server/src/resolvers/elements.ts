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

@Resolver()
export class ElementResolver {
  @Query(() => [Element])
  @UseMiddleware()
  async getElements(): Promise<Element[]> {
    const elements = await Element.find({
      relations: [
        "createdBy",
        "parent",
        "content",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });
    console.log("ELEMENTS:", elements);
    return elements;
  }

  @Query(() => Element)
  @UseMiddleware()
  async getElement(@Arg("elementId") elementId: number): Promise<Element> {
    return await Element.findOneOrFail(elementId, {
      relations: [
        "createdBy",
        "parent",
        "content",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });
  }

  @Query(() => [Element])
  @UseMiddleware()
  async getParentPages(): Promise<Element[]> {
    const elements = await Element.find({
      where: { type: ElementType.Page, parent: null },
      relations: [
        "createdBy",
        "parent",
        "content",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });
    console.log("ELEMENTS:", elements);
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
        "content",
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
          "content",
          "canEditGroups",
          "canViewGroups",
          "canInteractGroups",
        ],
      }
    );
  }

  @Mutation(() => Element, { nullable: true })
  @UseMiddleware()
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
          "content",
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
    element.index = index;
    element.createdBy = await User.findOneOrFail(payload?.userId);
    element.content = [];

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
  @UseMiddleware()
  async editElementProps(
    @Arg("elementId") elementId: number,
    @Arg("props", () => GraphQLJSONObject) props: object
  ): Promise<Element> {
    const element = await Element.findOneOrFail(elementId, {
      relations: ["createdBy", "parent", "content"],
    });

    element.props = { ...element.props, ...props };

    if (element.type === ElementType.Database) {
      // Need to ensure all content has same attributes

      element.content.forEach((child) => {
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
    @Arg("elementId") elementId: number,
    @Arg("index") index: number
  ): Promise<Element> {
    const element = await Element.findOneOrFail(elementId, {
      relations: [
        "createdBy",
        "parent",
        "content",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });

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
        "content",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });
    const parent = await Element.findOneOrFail(parentId, {
      relations: [
        "createdBy",
        "parent",
        "content",
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
        "content",
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
        "content",
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
