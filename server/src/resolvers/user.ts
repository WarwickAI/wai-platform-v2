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
import { isAdmin, isAuth, isExec } from "../isAuth";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

export const USER_RELATIONS = ["badges", "groups", "page"];

export const USER_RELATIONS_WITH_ELEMENTS = [...USER_RELATIONS, "elements"];

@Resolver()
export class UserResolver {
  // Add functions here, can be queries or mutatations

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async getUsers(): Promise<User[]> {
    return await User.find({ relations: ["groups"] });
  }

  // Only signed-in users can access this
  @Query(() => User)
  @UseMiddleware(isAuth)
  async getUser(@Arg("userId") userId: number): Promise<User> {
    return await User.findOneOrFail(userId);
  }

  @Mutation(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async verifyLogin(@Ctx() { payload }: MyContext) {
    if (!payload || !payload.userId) {
      console.log("access token invalid");
      return null;
    }
    const user = await User.findOne(parseInt(payload.userId));

    if (!user) {
      console.log("user id in access token invalid");
      return null;
    }
    return user;
  }

  @Mutation(() => User, { nullable: true })
  @UseMiddleware(isAuth, isExec)
  async updateUserRole(
    @Arg("email") email: string,
    @Arg("role") newRole: string
  ) {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found with that email");
      return null;
    }
    try {
      await User.update({ email }, { role: newRole });
      return user;
    } catch (err) {
      console.log(err);
      return user;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("id") id: number) {
    const user = await User.findOne(id);
    if (!user) {
      return false;
    }

    user.tokenVersion = user.tokenVersion + 1;
    await user.save();
    return true;
  }

  @Mutation(() => Boolean)
  async deleteAllUsers(): Promise<boolean> {
    await User.delete({});
    return true;
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  testJWT(@Ctx() { payload }: MyContext) {
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext) {
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
    return user;
  }
}
