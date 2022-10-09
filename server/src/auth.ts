import { User } from "./entities/User";
import { sign } from "jsonwebtoken";
import fs from "fs";
import dotenv from "dotenv";
import express from "express";
import * as saml from "passport-saml";

const passport = require("passport");
const authRouter = express.Router();

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

dotenv.config();

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

var samlStrategy = new saml.Strategy(
  {
    // URL that goes from the Identity Provider -> Service Provider
    callbackUrl: process.env.CALLBACK_URL,
    logoutCallbackUrl: process.env.LOGOUT_CALLBACK_URL,
    // URL that goes from the Service Provider -> Identity Provider
    entryPoint: process.env.ENTRY_POINT,
    // Usually specified as `/shibboleth` from site root
    issuer: process.env.ISSUER,
    // Service Provider private key
    decryptionPvk: fs.readFileSync("cert/key.pem", "utf8"),
    // Identity Provider's public key
    cert: fs.readFileSync("cert/cert_idp.pem", "utf8"),
    validateInResponseTo: false,
    disableRequestedAuthnContext: true,
    
  },
  function (profile: any, done: any) {
    return done(null, profile);
  }
);

passport.use(samlStrategy);

function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) return next();
  else return res.redirect("/auth/saml/login");
}

authRouter.get("/", ensureAuthenticated, function (_req: any, res: any) {
  res.send("Authenticated");
});

authRouter.get(
  "/saml/login",
  passport.authenticate("saml", { failureRedirect: "/login/fail" }),
  function (_req: any, res: any) {
    res.redirect("/");
  }
);

authRouter.post(
  "/saml/login/callback",
  passport.authenticate("saml", { failureRedirect: "/login/fail" }),
  function (_req: any, res: any) {
    res.redirect("/");
  }
);

authRouter.get("/login/saml/fail", function (_req: any, res: any) {
  res.status(401).send("Login failed");
});

authRouter.get("/saml/Shibboleth.sso/Metadata", function (_req: any, res: any) {
  res.type("application/xml");
  res
    .status(200)
    .send(
      samlStrategy.generateServiceProviderMetadata(
        fs.readFileSync("cert/cert.pem", "utf8")
      )
    );
});

//general error handler
authRouter.use(function (err: any, _req: any, _res: any, next: any) {
  console.log("Fatal error: " + JSON.stringify(err));
  next(err);
});

export { authRouter, passport };
