import { Tag } from "../entities/Tag";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  getTags() {
    return Tag.find();
  }

  @Query(() => Tag)
  getTag(@Arg("id") id: string) {
    return Tag.findOneOrFail(id);
  }

  @Mutation(() => Tag)
  createTag(
    @Arg("name") name: string,
    @Arg("color") color: string,
    @Arg("type") type: string,
    @Arg("description", { nullable: true }) description?: string
  ) {
    return Tag.create({ name, description, type, color }).save();
  }
}
