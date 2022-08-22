import { Express } from "express";
import { stringify } from "querystring";
import axios from "axios";
import { decode } from "jsonwebtoken";
import { sendRefreshToken } from "../sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../auth";
import { User } from "../entities/User";
import { Group } from "../entities/Group";

const setupCognitoAuthentication = (app: Express) => {
  app.get("/cognito-response", async (req, res) => {
    console.log("Received cognito response");
    const code: string = req.query.code as any;
    const data = {
      grant_type: "authorization_code",
      client_id: process.env.COGNITO_CLIENT_ID,
      code: code,
      scope: "profile",
      redirect_uri: process.env.COGNITO_REDIRECT_URL,
    };

    const p = {
      method: "post" as const,
      url: process.env.COGNITO_URL as string,
      data: stringify(data),
      auth: {
        username: process.env.COGNITO_CLIENT_ID as string,
        password: process.env.COGNITO_CLIENT_SECRET as string,
      },
    };

    const awsResponse = await axios(p);
    if (awsResponse.data.id_token) {
      const userInfo = decode(awsResponse.data.id_token) as any;
      console.log("user data:", userInfo);

      // Either login user, or register
      // Find existing user
      var user = await User.findOne(
        {
          cognitoUsername: userInfo["cognito:username"],
        },
        { relations: ["groups"] }
      );
      if (!user) {
        // Need to register user
        user = await User.create({
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          email: userInfo.email,
          cognitoUsername: userInfo["cognito:username"],
          role: "none",
          groups: [],
        }).save();
      }

      if (user.email === "Edward.Upton@warwick.ac.uk") {
        const adminGroup = await Group.findOneOrFail({ name: "Admin" });
        user.groups.push(adminGroup);
        user.save();
      }

      sendRefreshToken(res, createRefreshToken(user));

      res.redirect(
        `${process.env.CORS_ORIGIN}/projects?accessToken=${createAccessToken(
          user
        )}`
      );
      return;
    }
    console.log("Failed");
    res.send("Failed");
    return;
  });
};

export default setupCognitoAuthentication;
