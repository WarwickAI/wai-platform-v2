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

const main = async () => {
  // Connect to DB
  const orm = await MikroORM.init(mikroConfig);
  // Run migration
  await orm.getMigrator().up();

  // Create Express app
  const app = express();

  // Create Apollo server, building the schema also
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }), // Object accessible by resolvers
  });

  await apolloServer.start();

  // Created a GraphQL endpoint on express, localhost:4000/graphql
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server sarted on localhost:4000");
  });
};

main();
