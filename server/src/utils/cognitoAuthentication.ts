import { Express } from 'express';
import { stringify } from "querystring";
import axios from "axios";
import { decode } from "jsonwebtoken";
import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { sendRefreshToken } from '../sendRefreshToken';
import { createAccessToken, createRefreshToken } from '../auth';
import { User } from '../entities/User';

const setupCognitoAuthentication = (app: Express, em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>) => {
    app.get("/cognito-response", async (req, res) => {
        const code: string = req.query.code as any;
        const data = {
            grant_type: "authorization_code",
            client_id: process.env.COGNITO_CLIENT_ID,
            code: code,
            scope: 'profile',
            redirect_uri: process.env.COGNITO_REDIRECT_URL,
        };

        const p = {
            method: 'post' as const,
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

            // Either login user, or register
            // Find existing user
            var user = await em.findOne(User, { cognitoUsername: userInfo["cognito:username"] });
            if (!user) {
                // Need to register user
                user = em.create(User, {
                    firstName: userInfo.given_name,
                    lastName: userInfo.family_name,
                    email: userInfo.email,
                    cognitoUsername: userInfo["cognito:username"],
                    role: "none"
                });
                try {
                    await em.persistAndFlush(user);
                } catch (err) {
                    if (err.code === "23505") {
                        // || err.detail.includes("already exists")) {
                        // Duplicate username error
                        res.send({
                            errors: [
                                {
                                    field: "username",
                                    message: "username already taken",
                                },
                            ],
                        });
                        return;
                        // }
                    } else {
                        console.log(err);
                    }
                }
            }
            sendRefreshToken(res, createRefreshToken(user));

            res.redirect(`http://localhost:3000/projects?accessToken=${createAccessToken(user)}`);
            return;
        }
        res.send("Failed");
        return;
    })
}

export default setupCognitoAuthentication;