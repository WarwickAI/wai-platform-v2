import "dotenv/config";
import "reflect-metadata";
import { __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";
import { Project } from "./entities/Project";
import { sendRefreshToken } from "./sendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import setupCognitoAuthentication from "./utils/cognitoAuthentication";
import { ProjectResolver } from "./resolvers/project";
import { createConnection } from "typeorm";
import path from "path";
import { Talk } from "./entities/Talk";
import { TalkResolver } from "./resolvers/talk";
import { Course } from "./entities/Course";
import { Tutorial } from "./entities/Tutorial";
import { CourseResolver } from "./resolvers/course";
import { TutorialResolver } from "./resolvers/tutorial";
import { Tag } from "./entities/Tag";
import { Merch } from "./entities/Merch";
import { MerchResolver } from "./resolvers/merch";
import { TagResolver } from "./resolvers/tag";

const main = async () => {
  // Connect to DB
  // const conn = await createConnection({
  //   type: 'postgres',
  //   url: process.env.DATABASE_URL,
  //   logging: true,
  //   synchronize: !__prod__,
  //   migrations: __prod__ ? [path.join(__dirname, "./migrations/*")] : [],
  //   entities: [User, Project]
  // })

  // const conn = await createConnection({
  //   type: 'postgres',
  //   url: process.env.DATABASE_URL,
  //   logging: true,
  //   synchronize: false,
  //   migrations: [path.join(__dirname, "./migrations/*")],
  //   entities: [User, Project]
  // })

  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [],
    entities: [User, Project, Talk, Course, Tutorial, Merch, Tag],
  });
  // await User.delete((await User.find()).map((user) => user.id));
  await conn.runMigrations();

  // Create Express app
  const app = express();

  // Since we have NGINX in front in prod
  app.set("proxy", 1);

  app.use(
    cors({
      origin: [
        process.env.CORS_ORIGIN!,
        "https://warwickaiv2.auth.eu-west-2.amazoncognito.com",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    })
  );

  app.use(cookieParser());

  // Create refresh token route
  app.post("/refresh_token", async (req, res) => {
    console.log("received refresh token request");
    const token = req.cookies.jid;
    console.log(token);
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne(parseInt(payload.userId));

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  // Setup cognito authentication
  setupCognitoAuthentication(app);

  // Create Apollo server, building the schema also
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        ProjectResolver,
        TalkResolver,
        CourseResolver,
        TutorialResolver,
        MerchResolver,
        TagResolver
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }), // Object accessible by resolvers
  });

  await apolloServer.start();

  // Created a GraphQL endpoint on express, localhost:4000/graphql
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT!), () => {
    console.log("server sarted on localhost:4000");
  });
};

main();
