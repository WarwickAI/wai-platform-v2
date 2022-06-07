import {
  Arg,
  Args,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../isAuth";
import { Element, ElementType } from "../entities/Element";
import { User } from "../entities/User";
import { MyContext } from "../../src/types";
import { GraphQLJSONObject } from "graphql-type-json";
import { cloneDeep } from "lodash";

@Resolver()
export class ElementResolver {
  @Query(() => [Element])
  @UseMiddleware()
  async getElements(): Promise<Element[]> {
    return await Element.find({
      relations: ["createdBy", "parent", "content"],
    });
  }

  @Query(() => Element)
  @UseMiddleware()
  async getElement(@Arg("elementId") elementId: number): Promise<Element> {
    return await Element.findOneOrFail(elementId, {
      relations: ["createdBy", "parent", "content"],
    });
  }

  @Query(() => [Element])
  @UseMiddleware()
  async getParentPages(): Promise<Element[]> {
    return await Element.find({
      where: { type: ElementType.Page, parent: null },
      relations: ["createdBy", "parent", "content"],
    });
  }

  @Query(() => [Element])
  @UseMiddleware()
  async getDatabases(): Promise<Element[]> {
    return await Element.find({
      where: { type: ElementType.Database },
      relations: ["createdBy", "parent", "content"],
    });
  }

  @Query(() => Element)
  @UseMiddleware()
  async getDatabase(@Arg("databaseId") elementId: number): Promise<Element> {
    return await Element.findOneOrFail(
      { id: elementId, type: ElementType.Database },
      {
        relations: ["createdBy", "parent", "content"],
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
    if (parentId) {
      element.parent = await Element.findOneOrFail(parentId);
    }
    element.index = index;
    element.createdBy = await User.findOneOrFail(payload?.userId);
    element.content = [];
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
      relations: ["createdBy", "parent", "content"],
    });

    element.index = index;

    await element.save();
    console.log(element);
    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware()
  async editElementParent(
    @Arg("elementId") elementId: number,
    @Arg("parentId") parentId: number
  ): Promise<Element> {
    const element = await Element.findOneOrFail(elementId, {
      relations: ["createdBy", "parent", "content"],
    });
    const parent = await Element.findOneOrFail(parentId, {
      relations: ["createdBy", "parent", "content"],
    });
    element.parent = parent;

    await element.save();
    return element;
  }

  @Mutation(() => Element)
  @UseMiddleware()
  async removeElement(@Arg("elementId") elementId: number): Promise<Element> {
    const element = await Element.findOneOrFail(elementId, {
      relations: ["createdBy", "parent", "content"],
    });
    await element.remove();
    return element;
  }
}
