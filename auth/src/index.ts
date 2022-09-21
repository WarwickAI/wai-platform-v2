import "dotenv/config";
// import saml from "samlify";
import { readFileSync } from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const saml = require("samlify");

const main = async () => {
  const app = express();

  // Since we have NGINX in front in prod
  app.set("proxy", 1);

  app.use(
    cors({
      origin: [
        process.env.CORS_ORIGIN!,
        "https://warwickaiv2.auth.eu-west-2.amazoncognito.com",
        "https://idp.warwick.ac.uk",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    })
  );

  app.use(cookieParser());

  // configure a service provider
  const sp = saml.ServiceProvider({
    metadata: readFileSync("metadata_sp.xml"),
  });
  // configure the corresponding identity provider
  const idp = saml.IdentityProvider({
    metadata: readFileSync("metadata_idp.xml"),
  });

  // parse when receive a SAML Response from IdP
  app.post("/saml2/idpresponse", (req, _res) => {
    sp.parseLoginResponse(idp, "post", req)
      .then((parseResult: any) => {
        // Write your own validation and render function here
        console.log(parseResult);
      })
      .catch(console.error);
  });

  // parse when receive a SAML Response from IdP
  app.post("/saml2/logout", (req, _res) => {
    sp.parseLogoutResponse(idp, "post", req)
      .then((parseResult: any) => {
        // Write your own validation and render function here
        console.log(parseResult);
      })
      .catch(console.error);
  });

  app.get("/login", (_req, res) => {
    sp.entitySetting.relayState = "THIS IS SOME RELAY STATE FOR LOGIN";
    const { id, context } = sp.createLoginRequest(idp, "redirect");
    console.log(context);
    return res.redirect(context);
  });

//   app.get("/logout", (req, res) => {
//     sp.entitySetting.relayState = "THIS IS SOME RELAY STATE FOR LOGOUT";
//     const { id, context } = sp.createLogoutRequest(idp, "redirect");
//     console.log(context);
//     return res.redirect(context);
//   });

  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`server sarted on localhost:${process.env.PORT!}`);
  });
};

main();
