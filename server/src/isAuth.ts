import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "./types";
import { ForbiddenError } from "apollo-server-express";
import { User } from "./entities/User";

export const getAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (authorization) {
    try {
      const token = authorization;
      const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      context.payload = payload as any;
    } catch (err) {
      // Not an error, just wont add payload
    }
  }
  return next();
};

export const getUser: MiddlewareFn<MyContext> = async ({ context }, next) => {
  context.payload = context.payload?.userId
    ? {
        ...context.payload,
        user: await User.findOne(context.payload.userId, {
          relations: ["groups"],
        }),
      }
    : { ...context.payload, user: undefined };
  return next();
};

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new ForbiddenError("not authenticated");
  }

  try {
    const token = authorization;
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new ForbiddenError("not authenticated");
  }

  return next();
};

export const isExec: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const userId = context.payload?.userId;
  if (!userId) {
    throw new ForbiddenError("not authenticated");
  }

  try {
    const user = await User.findOne(parseInt(userId));
    if (!user) {
      throw new ForbiddenError("not authenticated");
    }

    if (user.role != "exec") {
      throw new ForbiddenError("not exec");
    }
  } catch (err) {
    console.log(err);
    throw new ForbiddenError("not authenticated");
  }

  return next();
};

export const isSuper: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const userId = context.payload?.userId;
  if (!userId) {
    throw new ForbiddenError("not authenticated");
  }

  try {
    const user = await User.findOne(parseInt(userId));
    if (!user) {
      throw new ForbiddenError("not authenticated");
    }

    if (
      user.email != "Edward.Upton@warwick.ac.uk" &&
      user.email != "Oliver.Jaffe@warwick.ac.uk" &&
      user.email != "Joe.Hewett@warwick.ac.uk"
    ) {
      throw new ForbiddenError("not exec");
    }
  } catch (err) {
    console.log(err);
    throw new ForbiddenError("not authenticated");
  }

  return next();
};
