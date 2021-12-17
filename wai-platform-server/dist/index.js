"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("./entities/User");
const sendRefreshToken_1 = require("./sendRefreshToken");
const auth_1 = require("./auth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const cognitoAuthentication_1 = __importDefault(require("./utils/cognitoAuthentication"));
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: ["http://localhost:3000", "https://studio.apollographql.com"],
        credentials: true,
    }));
    app.use((0, cookie_parser_1.default)());
    app.post("/refresh_token", async (req, res) => {
        console.log("received refresh token request");
        const token = req.cookies.jid;
        console.log(token);
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }
        let payload = null;
        try {
            payload = (0, jsonwebtoken_1.verify)(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }
        const user = await orm.em.findOne(User_1.User, { _id: payload.userId });
        console.log(user);
        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }
        (0, sendRefreshToken_1.sendRefreshToken)(res, (0, auth_1.createRefreshToken)(user));
        return res.send({ ok: true, accessToken: (0, auth_1.createAccessToken)(user) });
    });
    (0, cognitoAuthentication_1.default)(app, orm.em);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, em: orm.em }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => {
        console.log("server sarted on localhost:4000");
    });
};
main();
//# sourceMappingURL=index.js.map