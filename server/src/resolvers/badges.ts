import { Badge } from "../entities/Badge";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth, isExec } from "../isAuth";

@Resolver()
export class BadgeResolver {
  @Query(() => [Badge])
  getBadges() {
    return Badge.find();
  }

  @Query(() => Badge)
  getBadge(@Arg("id") id: string) {
    return Badge.findOneOrFail(id);
  }

  @Mutation(() => Badge)
  @UseMiddleware(isAuth, isExec)
  createBadge(
    @Arg("name") name: string,
    @Arg("color") color: string,
    @Arg("description", { nullable: true }) description?: string
  ) {
    return Badge.create({ name, description, color }).save();
  }
}
