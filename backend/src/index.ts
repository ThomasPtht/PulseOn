import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { PulseOnDataSource } from './config/db';
import { UserResolver } from './resolvers/UserResolver';
import { RunSessionResolver } from "./resolvers/RunSessionResolver";
import { ExerciseResolver } from "./resolvers/ExerciseResolver";
import { WorkoutSessionResolver } from "./resolvers/WorkoutSessionResolver";
import { User } from './entities/User';
import jwt, { Secret } from "jsonwebtoken";

const start = async () => {
    if (!process.env.JWT_SECRET_KEY) {
        throw Error("No JWT secret");
    }

    await PulseOnDataSource.initialize();

    const schema = await buildSchema({
        resolvers: [UserResolver, RunSessionResolver, ExerciseResolver, WorkoutSessionResolver],
    });

    const server = new ApolloServer({
        schema,
    });

    const { url } = await startStandaloneServer(server, {
        context: async ({ req, res }) => {
            // ✅ Parse cookies manuellement
            const cookies: Record<string, string> = {};
            const cookieHeader = req.headers.cookie;

            if (cookieHeader) {
                cookieHeader.split(';').forEach(cookie => {
                    const [name, value] = cookie.trim().split('=');
                    cookies[name] = decodeURIComponent(value);
                });
            }

            console.log("🍪 Cookies parsed:", cookies);

            // ✅ Récupérer l'utilisateur depuis le token
            let user = null;
            if (cookies.token) {
                try {
                    const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY as Secret) as { id: number; email: string };
                    user = await User.findOneBy({ id: decoded.id });
                    console.log("👤 User in context:", user?.id);
                } catch (error) {
                    console.error("❌ Token verification failed:", error);
                }
            }

            return {
                req: {
                    headers: req.headers,
                    cookies
                },
                res,
                user // ✅ Ajout de l'utilisateur au contexte
            };
        },
        listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
}

start();