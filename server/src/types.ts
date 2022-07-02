import { Request, Response } from "express";
import { User } from "./entities/User";

export type MyContext = {
  req: Request;
  res: Response;
  payload?: { userId?: string | undefined; user?: User | undefined };
};
