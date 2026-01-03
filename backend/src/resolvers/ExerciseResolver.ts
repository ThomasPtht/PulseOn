import { Exercise } from "../entities/Exercise";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(Exercise) // ✅ Ajoutez Exercise
export class ExerciseResolver {

    @Query(() => [Exercise]) // ✅ Ajoutez cette query
    async getExercises() {
        return await Exercise.find();
    }

    @Mutation(() => Exercise)
    async createExercise(@Arg("name") name: string) {
        try {
            const newExercise = Exercise.create({ name }); // ✅ Enlevez let en haut
            await newExercise.save();
            return newExercise; // ✅ Déplacé dans le try
        } catch (error) {
            console.error("Error creating exercise:", error);
            throw new Error("Failed to create exercise");
        }
    }
}