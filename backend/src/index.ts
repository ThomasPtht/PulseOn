
import "dotenv/config";
import * as cookie from "cookie";
import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import jwt, { Secret } from "jsonwebtoken";
import { buildSchema } from 'type-graphql';
import { PulseOnDataSource } from './config/db';
import { UserResolver } from './resolvers/UserResolver';



const start = async () => {
    if (
        process.env.JWT_SECRET_KEY === null || process.env.JWT_SECRET_KEY === undefined
    ) {
        throw Error("no jwt secret")
    }
    await PulseOnDataSource.initialize()


    const schema = await buildSchema({
        resolvers: [UserResolver],
    });




    const server = new ApolloServer({
        schema,
    });




    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req, res }) => {
            if (req.headers.cookie) {
                const cookies = cookie.parse(req.headers.cookie as string);
                if (cookies.token !== undefined) {
                    const payload: any = jwt.verify(
                        cookies.token,
                        process.env.JWT_SECRET_KEY as Secret
                    );
                    console.log("payload in context", payload);
                    if (payload) {
                        console.log("payload was found and returned to resolver");
                        return {
                            email: payload.email,
                            userRole: payload.userRole,
                            res: res,
                        };
                    }
                }
            }
            return { res: res };
        },
    });

    console.log(`🚀 Server listening at: ${url}`);
}
start()
