import { User } from "../entities/User";
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
import { isAuth, isExec, isSuper } from "../isAuth";
import { MemberInfoInput } from "../utils/MemberInfoInput";
import { MyContext } from "../types";
import { ElectionRole } from "../entities/ElectionRole";
import { RoleApplication } from "../entities/RoleApplication";
import { Vote } from "../entities/Vote";

const mustBeMemberFrom = new Date("March 3, 2022 19:00:00");
mustBeMemberFrom.setDate(mustBeMemberFrom.getDate() - 14);

@ObjectType()
class RoleApplicationResponseForVote {
  @Field(() => RoleApplication, { nullable: true })
  role?: RoleApplication;

  @Field({ nullable: true })
  message?: string;
}

@Resolver()
export class VoteResolver {
  @Query(() => [Vote])
  @UseMiddleware(isAuth, isExec, isSuper)
  async getAllVotes() {
    return await Vote.find({ relations: ["role", "user", "application"] });
  }

  @Query(() => RoleApplicationResponseForVote)
  @UseMiddleware(isAuth)
  async getRoleApplicationForVote(
    @Arg("voteId") voteId: number
  ) {
    const vote = await Vote.findOne(voteId, { relations: ["role"] });
    if (!vote) {
      return { message: "Could not find vote using ID" };
    }

    const role = vote.role;
    if (!role) {
      return { message: "Could not find role of vote" };
    }

    return { role };
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  async hasUserVotedForRole(
    @Ctx() { payload }: MyContext,
    @Arg("roleId", { nullable: true }) roleId?: number,
    @Arg("roleShortName", { nullable: true }) roleShortName?: string
  ) {
    const votes = await Vote.find({ relations: ["role", "user"] });
    const filteredVotes = votes.filter(
      (vote) =>
        ((roleId && vote.role.id === roleId) ||
          (roleShortName && vote.role.shortName === roleShortName)) &&
        vote.user.id === parseInt(payload?.userId ? payload.userId : "-1")
    );
    console.log(filteredVotes.length);
    if (filteredVotes.length === 1) {
      return true;
    }
    return false;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Ctx() { payload }: MyContext,
    @Arg("roleId", { nullable: true }) roleId?: number,
    @Arg("roleShortName", { nullable: true }) roleShortName?: string,
    @Arg("applicationId", { nullable: true }) applicationId?: number,
    @Arg("applicationShortName", { nullable: true })
    applicationShortName?: string
  ) {
    if (!payload) {
      console.log("Failed to get user id from payload");
      return false;
    }
    const user = await User.findOne(payload?.userId, { relations: ["votes"] });
    if (!user) {
      console.log("Failed to get user from db");
      return false;
    }

    const role = await ElectionRole.getByIdOrShortName(roleId, roleShortName, [
      "applications",
      "votes",
    ]);
    if (!role) {
      console.log("Failed to get role from db");
      return false;
    }

    const application = await RoleApplication.getByIdOrShortName(
      applicationId,
      applicationShortName,
      ["role", "votes"]
    );

    if (!application) {
      console.log("Failed to get application from db");
      return false;
    }

    if (application.role.id !== role.id) {
      console.log("Role ID does not match Application ID");
      return false;
    }

    if (!application.display) {
      console.log("Application is not public");
      return false;
    }

    const allVotes = await Vote.find({ relations: ["role", "user"] });
    if (
      allVotes.findIndex(
        (voteDb) => voteDb.role.id === role.id && voteDb.user.id === user.id
      ) !== -1
    ) {
      console.log("User already voted for this role");
      return false;
    }

    if (!user.isMember) {
      console.log("User not member");
      return false;
    }

    if (!user.memberFromDate || user.memberFromDate >= mustBeMemberFrom) {
      console.log(
        "User memberFromDate not available or has not been member for long enough"
      );
      return false;
    }

    const vote = Vote.create({
      application: application,
      role: role,
      user: user,
    });
    vote.save();
    return true;
  }
}
