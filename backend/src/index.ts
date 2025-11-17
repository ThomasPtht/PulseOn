import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql';
import { PulseOnDataSource } from './config/db';
import { UserResolver } from './resolvers/UserResolver';


const start = async () => {
    await PulseOnDataSource.initialize()


    const schema = await buildSchema({
        resolvers: [UserResolver],
    });




    const server = new ApolloServer({
        schema,
    });


    const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

    console.log(`🚀 Server listening at: ${url}`);
}
start()
