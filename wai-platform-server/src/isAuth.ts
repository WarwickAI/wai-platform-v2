import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "./types";
import { ForbiddenError } from "apollo-server-express";

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

export const isExec: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];


  if (!authorization) {
    throw new ForbiddenError("not authenticated");
  }

  try {
    const token = authorization;
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    
    context.payload = payload as any;
    console.log("Payload", payload);
    if ((payload as any).role != "exec") {
      throw new ForbiddenError("not exec");
    }
  } catch (err) {
    console.log(err);
    throw new ForbiddenError("not authenticated");
  }

  return next();
};
