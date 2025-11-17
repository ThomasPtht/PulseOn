import { Exercise } from "../entities/Exercise";
import { RunSession } from "../entities/RunSession";
import { SetEntity } from "../entities/Set";
import { User } from "../entities/User";
import { WorkoutSession } from "../entities/WorkoutSession";
import { DataSource } from "typeorm";


export const PulseOnDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    entities: [User, WorkoutSession, RunSession, Exercise, SetEntity],
    synchronize: true,
    logging: ["error", "query"],
})