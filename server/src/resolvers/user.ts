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
import argon2 from "argon2";
import { sendRefreshToken } from "../sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../auth";
import { isAuth, isExec } from "../isAuth";
import { UsernamePasswordInput } from "../utils/UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  accessToken?: string;
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

  // @Mutation(() => UserResponse) // Defining query type
  // async register(
  //   // Create an object argument type
  //   @Arg("options") options: UsernamePasswordInput,
  //   @Ctx() { em, res }: MyContext
  // ): Promise<UserResponse> {
  //   const errors = validateRegister(options);
  //   if (errors) {
  //     return { errors };
  //   }

  //   const hashedPassword = await argon2.hash(options.password);
  //   const user = em.create(User, {
  //     username: options.username,
  //     email: options.email,
  //     password: hashedPassword,
  //   });
  //   try {
  //     await em.persistAndFlush(user);
  //   } catch (err) {
  //     if (err.code === "23505") {
  //       // || err.detail.includes("already exists")) {
  //       // Duplicate username error
  //       return {
  //         errors: [
  //           {
  //             field: "username",
  //             message: "username already taken",
  //           },
  //         ],
  //       };
  //       // }
  //     } else {
  //       console.log(err);
  //     }
  //   }

  //   sendRefreshToken(res, createRefreshToken(user));

  //   return { user, accessToken: createAccessToken(user) };
  // }

  // @Mutation(() => UserResponse) // Defining query type
  // async login(
  //   // Create an object argument type
  //   @Arg("usernameOrEmail") usernameOrEmail: string,
  //   @Arg("password") password: string,
  //   @Ctx() { em, res }: MyContext
  // ): Promise<UserResponse> {
  //   const user = await em.findOne(
  //     User,
  //     usernameOrEmail.includes("@")
  //       ? { email: usernameOrEmail }
  //       : { username: usernameOrEmail }
  //   );
  //   if (!user) {
  //     return {
  //       errors: [
  //         { field: "usernameOrEmail", message: "that useranme doesn't exists" },
  //       ],
  //     };
  //   }

  //   const valid = await argon2.verify(user.password, password);
  //   if (!valid) {
  //     return {
  //       errors: [{ field: "password", message: "incorrect password" }],
  //     };
  //   }

  //   // Login successful

  //   sendRefreshToken(res, createRefreshToken(user));

  //   return { user, accessToken: createAccessToken(user) };
  // }

  // @Mutation(() => Boolean)
  // async forgotPassword(@Arg("email") email: string, @Ctx() { em }: MyContext) {
  //   const user = await em.findOne(User, { email });
  //   if (!user) {
  //     // the email is not in the db
  //     return true; // Dont want fishing for email's registered
  //   }

  //   await sendEmail(
  //     email,
  //     `<a href = "http://localhost:3000/change-password/${token}">reset password</>`
  //   );

  //   return true;
  // }

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
    const user = User.findOne(parseInt(payload.userId));

    if (!user) {
      console.log("user id in access token invalid");
      return null;
    }
    return user;
  }
}