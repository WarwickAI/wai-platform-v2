import { Response } from "express";
import { __prod__ } from "./constants";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
    sameSite: "lax",
    secure: __prod__
  });
};