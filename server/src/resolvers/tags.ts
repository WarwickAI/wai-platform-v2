import { Tag } from "../entities/Tag";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth, isExec } from "../isAuth";

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
  @UseMiddleware(isAuth, isExec)
  createTag(
    @Arg("name") name: string,
    @Arg("color") color: string,
    @Arg("type") type: string,
    @Arg("description", { nullable: true }) description?: string
  ) {
    return Tag.create({ name, description, type, color }).save();
  }
}
