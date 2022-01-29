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

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}


@Resolver()
export class UserResolver {
  // Add functions here, can be queries or mutatations

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async users(): Promise<User[]> {
    return User.find();
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
  async revokeRefreshTokensForUser(
    @Arg("id") id: number
  ) {
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
    console.log(payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext) {
    if (!payload || !payload.userId) {
      console.log("access token invalid");
      return null;
    }
    const user = User.findOne(parseInt(payload.userId), { relations: ["projects", "talks", "courses", "tutorials"] });

    if (!user) {
      console.log("user id in access token invalid");
      return null;
    }
    return user;
  }
}
