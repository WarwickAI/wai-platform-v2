import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth, isExec } from "../isAuth";
import FieldError from "../utils/FieldError";
import { ElectionRole } from "../entities/ElectionRole";
import { validateElectionRole } from "../utils/validateElectionRole";
import { ElectionRoleInput } from "../utils/ElectionRoleInput";
import { RoleApplication } from "../entities/RoleApplication";
import { Vote } from "../entities/Vote";

@ObjectType()
export class ElectionRoleResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field()
  role?: ElectionRole;
}

@ObjectType()
export class RoleApplicationVoteCount {
  @Field(() => RoleApplication)
  application: RoleApplication;

  @Field()
  count: number;
}

@Resolver()
export class ElectionResolver {
  @Query(() => [ElectionRole])
  async electionRoles(): Promise<ElectionRole[]> {
    return await ElectionRole.find({
      where: { display: true },
      relations: ["applications"],
    });
  }

  @Query(() => [ElectionRole])
  @UseMiddleware(isAuth, isExec)
  async allElectionRoles(): Promise<ElectionRole[]> {
    return await ElectionRole.find({ relations: ["applications"] });
  }

  @Query(() => ElectionRole, { nullable: true })
  async getElectionRole(
    @Arg("roleId", { nullable: true }) roleId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<ElectionRole | undefined> {
    const role = await ElectionRole.getByIdOrShortName(roleId, shortName, [
      "applications",
    ]);
    if (!role) return;
    return role;
  }

  @Mutation(() => ElectionRoleResponse)
  @UseMiddleware(isAuth, isExec)
  async createElectionRole(
    @Arg("roleInfo") roleInfo: ElectionRoleInput
  ): Promise<ElectionRoleResponse> {
    const errors = validateElectionRole(roleInfo);
    if (errors) {
      return { errors };
    }

    const role = ElectionRole.create(roleInfo);
    const ron = RoleApplication.create({
      title: "RON",
      shortName: "RON-" + roleInfo.shortName,
      display: true,
      description: "Vote to re-open nominations",
    });
    role.applications = [ron];
    await ron.save();
    await role.save();
    return { role };
  }

  @Mutation(() => ElectionRoleResponse)
  @UseMiddleware(isAuth, isExec)
  async editElectionRole(
    @Arg("id") id: number,
    @Arg("roleInfo") roleInfo: ElectionRoleInput
  ): Promise<ElectionRoleResponse> {
    const errors = validateElectionRole(roleInfo);
    if (errors) {
      return { errors };
    }

    await ElectionRole.update(id, roleInfo);
    var role = await ElectionRole.findOne(id, { relations: ["applications"] });

    if (!role) {
      return {
        errors: [{ field: "Election Role ID", message: "No role found" }],
      };
    } else {
      return { role };
    }
  }

  @Query(() => [RoleApplication])
  async electionRoleApplications(
    @Arg("roleId", { nullable: true }) roleId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<RoleApplication[]> {
    const role = await ElectionRole.getByIdOrShortName(roleId, shortName, [
      "applications",
    ]);

    if (!role) {
      return [];
    }
    const publicApplications = role.applications.filter(
      (application) => application.display
    );
    return publicApplications;
  }

  @Query(() => [RoleApplication])
  @UseMiddleware(isAuth, isExec)
  async electionRoleAllApplications(
    @Arg("roleId", { nullable: true }) roleId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<RoleApplication[]> {
    const role = await ElectionRole.getByIdOrShortName(roleId, shortName, [
      "applications",
    ]);

    if (!role) {
      return [];
    }
    return role.applications;
  }

  @Query(() => [RoleApplicationVoteCount])
  @UseMiddleware(isAuth, isExec)
  async getRoleVoteCount(
    @Arg("roleId", { nullable: true }) roleId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    const role = await ElectionRole.getByIdOrShortName(roleId, shortName, [
      "applications",
      "votes",
    ]);

    if (!role) {
      console.log("Failed to find role in db");
      return [];
    }

    const roleVoteCounts: RoleApplicationVoteCount[] = role?.applications.map(
      (application) => {
        return { application: application, count: 0 };
      }
    );

    for (let i = 0; i < role.votes.length; i++) {
      const vote = role.votes[i];
      const voteDb = await Vote.findOne(vote.id, {
        relations: ["application"],
      });
      console.log(voteDb);
      console.log(roleVoteCounts);
      if (voteDb !== undefined) {
        const applicationIdx = roleVoteCounts.findIndex(
          (elem) => elem.application.id == voteDb.application.id
        );
        if (applicationIdx !== -1) {
          console.log("Incrementing");
          roleVoteCounts[applicationIdx].count += 1;
        }
      }
    }

    return roleVoteCounts;
  }
}
