import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourcePulseOn } from "./config/db";
import { buildSchema } from "type-graphql"; // 👈 corriger ici
import { UserResolver } from "./resolvers/UserResolver";

const start = async () => {
    await dataSourcePulseOn.initialize();

    const schema = await buildSchema({
        resolvers: [UserResolver],
    });

    const server = new ApolloServer({
        schema,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
};

start(); 
