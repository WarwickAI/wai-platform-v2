import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Badge } from "../entities/Badge";
import { isAuth, isExec } from "../isAuth";
import { User } from "../entities/User";
import FieldError from "../utils/FieldError";
import { BadgeInput } from "../utils/BadgeInput";
import { validateBadge } from "../utils/validateBadge";

@ObjectType()
export class BadgeResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field()
  badge?: Badge;
}

@Resolver()
export class BadgeResolver {
  @Query(() => [Badge])
  async badges(): Promise<Badge[]> {
    return await Badge.find();
  }

  @Query(() => Badge, { nullable: true })
  async badgeByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Badge | undefined> {
    const badge = await Badge.findOne({ shortName });
    if (!badge) return;
    return badge;
  }

  @Mutation(() => BadgeResponse)
  @UseMiddleware(isAuth, isExec)
  async createBadge(
    @Arg("badgeInfo") badgeInfo: BadgeInput
  ): Promise<BadgeResponse> {
    const errors = validateBadge(badgeInfo);
    if (errors) {
      return { errors };
    }

    const badge = await Badge.create(badgeInfo).save();
    return { badge };
  }

  @Mutation(() => BadgeResponse)
  @UseMiddleware(isAuth, isExec)
  async editBadge(
    @Arg("id") id: number,
    @Arg("badgeInfo") badgeInfo: BadgeInput
  ): Promise<BadgeResponse> {
    const errors = validateBadge(badgeInfo);
    if (errors) {
      return { errors };
    }

    await Badge.update(id, badgeInfo);
    var badge = await Badge.findOne(id);

    if (!badge) {
      return { errors: [{ field: "Badge ID", message: "No badge found" }] };
    }

    try {
      return { badge };
    } catch (e) {
      return { errors: [{ field: "Saving", message: e }] };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async adminGiveBadge(
    @Arg("userId", { nullable: true }) userId?: number,
    @Arg("userEmail", { nullable: true }) userEmail?: string,
    @Arg("badgeId", { nullable: true }) badgeId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    const user = await User.getByIdOrEmail(userId, userEmail);
    if (!user) {
      console.log("Failed to find user");
      return false;
    }

    console.log(user);

    const badge = await Badge.getByIdOrShortName(badgeId, shortName, true);

    if (!badge) {
      return false;
    }

    try {
      badge.users.push(user);
      badge.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async adminRemoveBadge(
    @Arg("userId") userId: number,
    @Arg("badgeId", { nullable: true }) badgeId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    const badge = await Badge.getByIdOrShortName(badgeId, shortName, true);

    if (!badge) {
      return false;
    }

    const userIndex = badge.users.findIndex((us) => us.id === userId);
    if (userIndex === -1) {
      return false;
    }

    badge.users.splice(userIndex, 1);
    badge.save();

    return true;
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async badgeUsers(
    @Arg("badgeId", { nullable: true }) badgeId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    const badge = await Badge.getByIdOrShortName(badgeId, shortName, true);

    if (!badge) {
      return false;
    }

    return badge.users;
  }
}
