import { User } from "../entities/User";
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
import { sendRefreshToken } from "../sendRefreshToken";
import { isAuth, isExec } from "../isAuth";
import { RoleApplication } from "../entities/RoleApplication";
import { ElectionRole } from "../entities/ElectionRole";
import { Group } from "../entities/Group";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@Resolver()
export class GroupResolver {
  // Add functions here, can be queries or mutatations

  @Query(() => [Group])
  @UseMiddleware()
  async groups(): Promise<Group[]> {
    return Group.find({ relations: ["users"] });
  }

  @Query(() => [Group], { nullable: true })
  @UseMiddleware(isAuth)
  async getUsersGroups(@Ctx() { payload }: MyContext) {
    if (!payload || !payload.userId) {
      console.log("access token invalid");
      return null;
    }
    const user = await User.findOne(parseInt(payload.userId), {
      relations: ["groups"],
    });

    if (!user) {
      console.log("user id in access token invalid");
      return null;
    }
    return user.groups;
  }

  @Mutation(() => User, { nullable: true })
  async addUserToGroup(
    @Arg("groupId") groupId: number,
    @Arg("userId") userId: number
  ) {
    const user = await User.findOne(userId, { relations: ["groups"] });
    if (!user) {
      console.log("No user found with that email");
      return null;
    }
    try {
      const group = await Group.findOneOrFail(groupId);
      user.groups.push(group);
      await user.save();
      return user;
    } catch (err) {
      console.log(err);
      return user;
    }
  }

  @Mutation(() => [User])
  async addUsersToGroup(
    @Arg("groupId") groupId: number,
    @Arg("userId", () => [Number]) userIds: number[]
  ) {
    const users = await User.findByIds(userIds, { relations: ["groups"] });
    try {
      const group = await Group.findOneOrFail(groupId);
      console.log(users.map((user) => user.id));
      users.forEach(async (user) => {
        user.groups.push(group);
        await user.save();
      });
      return users;
    } catch (err) {
      console.log(err);
      return users;
    }
  }

  @Mutation(() => Group)
  @UseMiddleware()
  async createGroup(
    @Arg("groupName") groupName: string
  ): Promise<Group | null> {
    try {
      const group = Group.create({ name: groupName });
      group.users = [];
      await group.save();
      return group;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
