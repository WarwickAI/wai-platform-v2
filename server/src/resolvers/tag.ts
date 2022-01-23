import { Tag } from "../entities/Tag";
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import FieldError from "../utils/FieldError";
import { isAuth, isExec } from "../isAuth";
import { validateTag } from "../utils/validateTag";
import { TagInput } from "../utils/TagInput";

@ObjectType()
export class TagResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field()
  tag?: Tag;
}

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  async tags(): Promise<Tag[]> {
    return await Tag.find();
  }

  @Mutation(() => TagResponse)
  @UseMiddleware(isAuth, isExec)
  async createTag(@Arg("tagInfo") tagInfo: TagInput): Promise<TagResponse> {
    const errors = validateTag(tagInfo);
    if (errors) {
      return { errors };
    }
    const tag = await Tag.create(tagInfo).save();
    return { tag };
  }
}
