import { Exercise } from "src/entities/Exercise";

import { Field, InputType } from "type-graphql";

@InputType()
export class ExerciseInput implements Partial<Exercise> {
    @Field()
    name: string;

}