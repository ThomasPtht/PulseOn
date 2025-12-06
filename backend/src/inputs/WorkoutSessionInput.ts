
import { Field, InputType } from "type-graphql";

@InputType()
export class SetInput {

    @Field()
    repetitions: number;

    @Field()
    weight: number;

    @Field({ nullable: true })
    restSeconds?: number;

    @Field({ nullable: true })
    isWarmup?: boolean;
}

@InputType()
export class ExerciseInput {
    @Field()
    exerciseId: number;

    @Field(() => [SetInput])
    sets: SetInput[];
}

@InputType()
export class WorkoutSessionInput {
    @Field()
    date: Date;

    @Field(() => [ExerciseInput])
    exercises: ExerciseInput[];
}