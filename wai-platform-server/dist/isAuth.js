"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const apollo_server_express_1 = require("apollo-server-express");
const isAuth = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new apollo_server_express_1.ForbiddenError("not authenticated");
    }
    try {
        const token = authorization;
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
        context.payload = payload;
    }
    catch (err) {
        console.log(err);
        throw new apollo_server_express_1.ForbiddenError("not authenticated");
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map