import "dotenv/config";
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";
import { sendRefreshToken } from "./sendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import setupCognitoAuthentication from "./utils/cognitoAuthentication";
import { ProjectResolver } from "./resolvers/project";
import { Project } from "./entities/Project";
// import { samlMetadataIDP, samlMetadataSP } from "./utils/samlMetadata";

const main = async () => {
  // Connect to DB
  const orm = await MikroORM.init(mikroConfig);


  // orm.em.nativeDelete(User, {});
  // Run migration
  await orm.getMigrator().up();

  // const user = await orm.em.findOne(User, { firstName: "Edward" });
  // if (user) {
  //   user.role = "exec";
  //   await orm.em.persistAndFlush(user);
  // }

  // const projectExample = orm.em.create(Project, {
  //   title: "Marketplace Matching",
  //   description: "Large online markets struggle to efficiently match buyers and sellers. The problem grows in complexity when matching Business to Business rather than Business to Customer.A team of students will be recruited to research and implement a solution to this problem, involving advanced NLP and recommendation algorithms. Students wanting to join this course require a passion for NLP, algorithms or research.",
  //   cover: "https://amplify-waiplatform-dev-222739-deployment.s3.eu-west-2.amazonaws.com/projects/market-place-match.jpg",
  //   shortName: "market-place-match",
  //   difficulty: "ADVANCED"
  // });
  // await orm.em.persistAndFlush(projectExample);

  // Create Express app
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
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
    const user = await orm.em.findOne(User, { _id: payload.userId });

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
  setupCognitoAuthentication(app, orm.em);

  // Create Apollo server, building the schema also
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver, ProjectResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, em: orm.em }), // Object accessible by resolvers
  });

  await apolloServer.start();

  // Created a GraphQL endpoint on express, localhost:4000/graphql
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server sarted on localhost:4000");
  });
};

main();
