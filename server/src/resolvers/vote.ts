import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth, isExec } from "../isAuth";
import { MemberInfoInput } from "../utils/MemberInfoInput";
import { MyContext } from "../types";
import { ElectionRole } from "../entities/ElectionRole";
import { RoleApplication } from "../entities/RoleApplication";
import { Vote } from "../entities/Vote";

@Resolver()
export class VoteResolver {
  @Query(() => [Vote])
  @UseMiddleware(isAuth, isExec)
  async getAllVotes() {
    return await Vote.find({ relations: ["role", "user", "application"] });
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

    const allVotes = await Vote.find({ relations: ["role", "user"] });
    if (
      allVotes.findIndex(
        (voteDb) => voteDb.role.id === role.id && voteDb.user.id && user.id
      ) !== -1
    ) {
      console.log("User already voted for this role");
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
