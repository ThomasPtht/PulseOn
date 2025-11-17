import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./Exercise";
import { WorkoutSession } from "./WorkoutSession";
import { ObjectType, Field, ID, Int, Float } from "type-graphql";

@ObjectType()
@Entity()
export class SetEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column("int")
    repetitions: number

    @Field(() => Float)
    @Column("float")
    weight: number; // in kilograms

    @Field(() => Int)
    @Column()
    restSeconds: number; // in seconds

    @Field()
    @Column()
    isWarmup: boolean;

    @Field(() => WorkoutSession)
    @ManyToOne(() => WorkoutSession, (session) => session.sets, { onDelete: "CASCADE" })
    workoutSession: WorkoutSession;

    @Field(() => Exercise)
    @ManyToOne(() => Exercise, exercise => exercise.sets, { onDelete: "CASCADE" })
    exercise: Exercise;
}