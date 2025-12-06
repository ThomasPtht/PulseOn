import { WorkoutSession } from "../entities/WorkoutSession";
import { Exercise } from "../entities/Exercise";
import { Arg, Mutation, Resolver } from "type-graphql";
import { SetEntity } from "../entities/Set";
import { WorkoutSessionInput } from "../inputs/WorkoutSessionInput";

@Resolver()
export class WorkoutSessionResolver {
    @Mutation(() => WorkoutSession)
    async newWorkoutSession(@Arg("data") data: WorkoutSessionInput) {
        const workoutSession = WorkoutSession.create({ date: data.date });
        await workoutSession.save();

        for (const exerciseInput of data.exercises) {
            const exercise = await Exercise.findOne({ where: { id: exerciseInput.exerciseId } });
            if (!exercise) {
                throw new Error(`Exercise not found`);
            }
            for (const setInput of exerciseInput.sets) {
                const set = SetEntity.create({
                    repetitions: setInput.repetitions,
                    weight: setInput.weight,
                    restSeconds: setInput.restSeconds,
                    isWarmup: setInput.isWarmup,
                    workoutSession: workoutSession,
                    exercise,
                });
                await set.save();
            }
        }

        return WorkoutSession.findOne({
            where: { id: workoutSession.id },
            relations: ["sets", "sets.exercise"],
        });
    }
}