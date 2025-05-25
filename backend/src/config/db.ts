import { DataSource } from "typeorm";
import { User } from "./entities/User";


export const dataSourcePulseOn = new DataSource({
    type: "postgres",
    host:"db",
    username: "postgres",
    database: "postgres",
    password: "example",
    entities: [User],
    synchronize: true,
    logging: ["error", "query"],
});