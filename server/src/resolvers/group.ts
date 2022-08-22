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
import { getAuth, getUser, isAdmin, isAuth } from "../isAuth";
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
    return Group.find();
  }

  @Query(() => [Group])
  @UseMiddleware(getAuth, isAdmin)
  async groupsWithUsers(): Promise<Group[]> {
    return Group.find({ relations: ["users"] });
  }

  @Query(() => [Group], { nullable: true })
  @UseMiddleware(isAuth, getUser)
  async getUsersGroups(@Ctx() { payload }: MyContext) {
    return payload?.user?.groups;
  }

  @Mutation(() => Group)
  @UseMiddleware(isAuth, isAdmin)
  async addUserToGroup(
    @Arg("groupId") groupId: number,
    @Arg("userId") userId: number
  ) {
    const user = await User.findOne(userId, { relations: ["groups"] });
    if (!user) {
      throw new Error("User not found");
    }
    try {
      const group = await Group.findOneOrFail(groupId, {
        relations: ["users"],
      });
      group.users.push(user);
      await group.save();
      return group;
    } catch (err) {
      console.log(err);
      throw new Error("Error adding user to group");
    }
  }

  @Mutation(() => Group)
  @UseMiddleware(isAuth, isAdmin)
  async addUsersToGroup(
    @Arg("groupId") groupId: number,
    @Arg("userId", () => [Number]) userIds: number[]
  ) {
    const users = await User.findByIds(userIds, { relations: ["groups"] });
    try {
      const group = await Group.findOneOrFail(groupId, {
        relations: ["users"],
      });
      group.users.push(...users);
      group.save();
      return group;
    } catch (err) {
      console.log(err);
      throw new Error("Error adding users to group");
    }
  }

  @Mutation(() => Group)
  @UseMiddleware(isAuth, isAdmin)
  async removeUserFromGroup(
    @Arg("groupId") groupId: number,
    @Arg("userId") userId: number
  ) {
    const user = await User.findOne(userId, { relations: ["groups"] });
    if (!user) {
      throw new Error("User not found");
    }
    try {
      const group = await Group.findOneOrFail(groupId, {
        relations: ["users"],
      });
      group.users = group.users.filter((u) => u.id !== userId);
      await group.save();
      return group;
    } catch (err) {
      console.log(err);
      throw new Error("Error removing user from group");
    }
  }

  @Mutation(() => Group)
  @UseMiddleware(isAuth, isAdmin)
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

  @Mutation(() => Group)
  @UseMiddleware(isAuth, isAdmin)
  async deleteGroup(@Arg("groupId") groupId: number): Promise<Group> {
    const group = await Group.findOneOrFail(groupId);
    await group.remove();
    return group;
  }
}
