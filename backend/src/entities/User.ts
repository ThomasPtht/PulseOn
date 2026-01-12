import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkoutSession } from "./WorkoutSession";
import { RunSession } from "./RunSession";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field()
    @Column()
    username: string;

    @Column()
    password: string;

    @Field()
    @Column()
    createdAt: Date;

    @Field()
    @Column({ default: true })
    isActive: boolean;

    @Field(() => [WorkoutSession])
    @OneToMany(() => WorkoutSession, workoutSession => workoutSession.user)
    workoutSession: WorkoutSession[];

    @Field(() => [RunSession])
    @OneToMany(() => RunSession, run => run.user)
    runSessions: RunSession[];
}