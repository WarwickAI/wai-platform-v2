"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExec = exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const apollo_server_express_1 = require("apollo-server-express");
const User_1 = require("./entities/User");
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
const isExec = async ({ context }, next) => {
    var _a;
    const userId = (_a = context.payload) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        throw new apollo_server_express_1.ForbiddenError("not authenticated");
    }
    try {
        const user = await context.em.findOne(User_1.User, { _id: parseInt(userId) });
        if (!user) {
            throw new apollo_server_express_1.ForbiddenError("not authenticated");
        }
        if (user.role != "exec") {
            throw new apollo_server_express_1.ForbiddenError("not exec");
        }
    }
    catch (err) {
        console.log(err);
        throw new apollo_server_express_1.ForbiddenError("not authenticated");
    }
    return next();
};
exports.isExec = isExec;
//# sourceMappingURL=isAuth.js.map