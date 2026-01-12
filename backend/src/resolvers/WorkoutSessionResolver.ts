import { WorkoutSession } from "../entities/WorkoutSession";
import { Exercise } from "../entities/Exercise";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { SetEntity } from "../entities/Set";
import { WorkoutSessionInput } from "../inputs/WorkoutSessionInput";
import { User } from "../entities/User";

@Resolver(WorkoutSession)
export class WorkoutSessionResolver {

    @Query(() => [WorkoutSession])
    async getMyWorkoutSessions(@Ctx() context: any) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }

        console.log("🔍 Fetching workout sessions for user:", context.user.id);

        const sessions = await WorkoutSession.find({
            where: { user: { id: context.user.id } },
            relations: ["user", "sets", "sets.exercise"],
            order: { date: "DESC" }
        });

        console.log("✅ Found workout sessions:", sessions.length);

        return sessions;
    }

    @Mutation(() => WorkoutSession)
    async newWorkoutSession(@Arg("data") data: WorkoutSessionInput, @Ctx() context: any) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }

        const user = await User.findOneBy({ id: context.user.id });
        if (!user) {
            throw new Error("User not found");
        }

        const workoutSession = WorkoutSession.create({ date: data.date, user });
        await workoutSession.save();

        console.log("💪 New workout session created for user:", user.id);

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
                console.log(`✅ Set created: ${setInput.repetitions} reps @ ${setInput.weight}kg`);
            }
        }

        // ✅ Rechargez avec les relations
        return await WorkoutSession.findOne({
            where: { id: workoutSession.id },
            relations: ["user", "sets", "sets.exercise"],
        }) as WorkoutSession;
    }


    @Mutation(() => Boolean)
    async deleteWorkoutSession(@Arg("id") id: number, @Ctx() context: any) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }

        const strenghtSession = await WorkoutSession.find({
            where: { user: { id: context.user.id }, id },
        });

        if (strenghtSession.length === 0) {
            throw new Error("Run session not found or you do not have permission to delete it.");
        }

        const removeResult = await WorkoutSession.delete({ id, user: { id: context.user.id } });

        return (removeResult.affected ?? 0) > 0;


    }
}