import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { sendRefreshToken } from "../sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../auth";
import { isAuth } from "../isAuth";
import { verify } from "jsonwebtoken";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

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
  async users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Mutation(() => UserResponse) // Defining query type
  async register(
    // Create an object argument type
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, res }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    if (options.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 3",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505") {
        // || err.detail.includes("already exists")) {
        // Duplicate username error
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
      // } else {
      //   console.log(err);
      // }
    }

    sendRefreshToken(res, createRefreshToken(user));

    return { user, accessToken: createAccessToken(user) };
  }

  @Mutation(() => UserResponse) // Defining query type
  async login(
    // Create an object argument type
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, res }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          { field: "username", message: "that useranme doesn't exists" },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: "incorrect password" }],
      };
    }

    // Login successful

    sendRefreshToken(res, createRefreshToken(user));

    return { user, accessToken: createAccessToken(user) };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ) {
    const user = await em.findOne(User, { _id: id });
    if (!user) {
      return false;
    }

    user.tokenVersion = user.tokenVersion + 1;
    em.persistAndFlush(user);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteAllUsers(@Ctx() { em }: MyContext): Promise<boolean> {
    em.nativeDelete(User, {});
    return true;
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  testJWT(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { em, req }: MyContext) {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization;
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return em.findOne(User, payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
