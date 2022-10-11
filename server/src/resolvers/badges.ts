import { Badge } from "../entities/Badge";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getUser, isAuth, isExec } from "../isAuth";
import { User } from "../entities/User";
import { USER_RELATIONS as EXPORTED_USER_RELATIONS } from "./user";
import { MyContext } from "src/types";

@InputType()
class BadgeUpdateProperties {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  canClaim?: boolean;

  @Field(() => String, { nullable: true })
  claimUntil?: Date;
}

const USER_RELATIONS = [
  ...EXPORTED_USER_RELATIONS.map((relation) => "users." + relation),
  "users",
];

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

  @Mutation(() => Badge)
  @UseMiddleware(isAuth, isExec)
  async updateBadge(
    @Arg("id") id: string,
    @Arg("properties", () => BadgeUpdateProperties)
    properties: BadgeUpdateProperties
  ) {
    const badge = await Badge.findOneOrFail(id);
    Object.assign(badge, properties);
    return badge.save();
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async getBadgeUsers(@Arg("id") id: string) {
    const badge = await Badge.findOneOrFail(id, { relations: USER_RELATIONS });
    return badge.users;
  }

  @Mutation(() => [User])
  @UseMiddleware(isAuth, isExec)
  async addBadgeUser(@Arg("id") id: string, @Arg("userId") userId: number) {
    const badge = await Badge.findOneOrFail(id, { relations: USER_RELATIONS });
    const user = await User.findOneOrFail(userId, {
      relations: EXPORTED_USER_RELATIONS,
    });
    badge.users.push(user);
    await badge.save();
    return badge.users;
  }

  @Mutation(() => [User])
  @UseMiddleware(isAuth, isExec)
  async removeBadgeUser(@Arg("id") id: string, @Arg("userId") userId: number) {
    const badge = await Badge.findOneOrFail(id, { relations: USER_RELATIONS });
    const user = await User.findOneOrFail(userId);
    badge.users = badge.users.filter((u) => u.id !== user.id);
    await badge.save();
    return badge.users;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, getUser)
  async claimBadge(@Ctx() { payload }: MyContext, @Arg("id") id: string) {
    const user = payload?.user;
    if (!user) {
      throw new Error("not authenticated");
    }

    const badge = await Badge.findOneOrFail(id, { relations: USER_RELATIONS });

    if (!badge.canClaim) {
      // Badge cannot be claimed
      return false;
    }

    if (badge.claimUntil && badge.claimUntil < new Date()) {
      // Badge claim period has ended
      return false;
    }

    if (badge.users.find((u) => u.id === user.id)) {
      // User already has badge
      return false;
    }

    badge.users.push(user);
    await badge.save();
    return true;
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth, getUser)
  async hasBadge(@Ctx() { payload }: MyContext, @Arg("id") id: string) {
    const user = payload?.user;
    if (!user) {
      throw new Error("not authenticated");
    }

    const badge = await Badge.findOneOrFail(id, { relations: USER_RELATIONS });

    return !!badge.users.find((u) => u.id === user.id);
  }
}
