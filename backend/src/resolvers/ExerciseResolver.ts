import { Exercise } from "../entities/Exercise";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class ExerciseResolver {
    @Mutation(() => Exercise)
    async createExercise(@Arg("name") name: string) {
        let newExercise;
        try {
            const newExercise = Exercise.create({ name });
            await newExercise.save();
        } catch (error) {
            console.error("Error creating exercise:", error);
            throw new Error("Failed to create exercise");
        }

        return newExercise;
    }



}