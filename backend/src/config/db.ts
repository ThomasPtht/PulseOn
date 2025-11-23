import { Exercise } from "../entities/Exercise";
import { RunSession } from "../entities/RunSession";
import { SetEntity } from "../entities/Set";
import { User } from "../entities/User";
import { WorkoutSession } from "../entities/WorkoutSession";
import { DataSource } from "typeorm";


export const PulseOnDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "test",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DB_NAME || "test",
    entities: [User, WorkoutSession, RunSession, Exercise, SetEntity],
    synchronize: true,
    logging: ["error", "query"],
})