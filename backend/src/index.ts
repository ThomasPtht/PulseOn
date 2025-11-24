import "dotenv/config";
import * as cookie from "cookie";
import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import jwt, { Secret } from "jsonwebtoken";
import { buildSchema } from 'type-graphql';
import { PulseOnDataSource } from './config/db';
import { UserResolver } from './resolvers/UserResolver';
import { RunSessionResolver } from "./resolvers/RunSessionResolver";

const start = async () => {
    if (
        process.env.JWT_SECRET_KEY === null || process.env.JWT_SECRET_KEY === undefined
    ) {
        throw Error("no jwt secret")
    }
    await PulseOnDataSource.initialize()

    const schema = await buildSchema({
        resolvers: [UserResolver, RunSessionResolver],
    });

    const server = new ApolloServer({
        schema,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req, res }) => {
            if (req.headers.cookie) {
                const cookies = cookie.parse(req.headers.cookie as string);
                console.log("Cookies parsés:", cookies); // ✅ Debug

                if (cookies.token) {
                    try {
                        const payload: any = jwt.verify(
                            cookies.token,
                            process.env.JWT_SECRET_KEY as Secret
                        );

                        console.log("User authentifié:", payload); // ✅ Debug

                        return {
                            user: {
                                id: payload.id,
                                email: payload.email,
                            },
                            res,
                        };
                    } catch (err: any) {
                        console.error("JWT error in context:", err.message);
                        return { res };
                    }
                }
            }

            console.log("Aucun cookie trouvé"); // ✅ Debug
            return { res };
        }
    });

    console.log(`🚀 Server listening at: ${url}`);
}
start()