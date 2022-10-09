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
  // If haven't extracted the user from the payload, do so first
  if (!context.payload?.user) {
    if (!context.payload?.userId) {
      throw new ForbiddenError("not user id");
    }

    const user = await User.findOne(context.payload.userId, {
      relations: ["groups"],
    });

    if (!user) {
      throw new ForbiddenError("no user found with id");
    }

    context.payload = {
      ...context.payload,
      user,
    };
  }

  // We know at this point we have a user
  const user = context.payload.user!;

  // Check that the user has a group `Admin`
  if (!user.groups.some((g) => g.name === "Exec")) {
    throw new ForbiddenError("not exec");
  }

  return next();
};

export const isSuper: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const userId = context.payload?.userId;
  if (!userId) {
    throw new ForbiddenError("not authenticated");
  }

  try {
    const user = await User.findOne(parseInt(userId), {
      relations: ["groups"],
    });
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

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  // If haven't extracted the user from the payload, do so first
  if (!context.payload?.user) {
    if (!context.payload?.userId) {
      throw new ForbiddenError("not user id");
    }

    const user = await User.findOne(context.payload.userId, {
      relations: ["groups"],
    });

    if (!user) {
      throw new ForbiddenError("no user found with id");
    }

    context.payload = {
      ...context.payload,
      user,
    };
  }

  // We know at this point we have a user
  const user = context.payload.user!;

  // Check that the user has a group `Admin`
  if (!user.groups.some((g) => g.name === "Admin")) {
    throw new ForbiddenError("not admin");
  }

  return next();
};
