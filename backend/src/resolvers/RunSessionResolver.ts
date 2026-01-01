import { User } from "../entities/User";
import { RunSession } from "../entities/RunSession";
import { RunSessionInput } from "../inputs/RunSessionInput";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver(RunSession)
export class RunSessionResolver {
    @Mutation(() => RunSession)
    async createRunSession(@Arg("data") data: RunSessionInput, @Ctx() context: any) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }

        const user = await User.findOneBy({ id: context.user.id })
        if (!user) {
            throw new Error("User not found");
        }

        const newRunSession = await RunSession.save({
            ...data,
            user,
        })
        console.log("New run session created for user:", user?.id);

        const savedRunSession = await RunSession.findOne({
            where: { id: newRunSession.id },
            relations: ["user"]
        });

        if (!savedRunSession) {
            throw new Error("Failed to retrieve saved run session");
        }

        return savedRunSession;
    }

    @Query(() => [RunSession])
    async getMyRunSessions(@Ctx() context: any) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }

        console.log("🔍 Fetching sessions for user:", context.user.id);

        const runSession = await RunSession.find({
            where: { user: { id: context.user.id } }, // ✅ Utilise directement context.user.id
            relations: ["user"],
            order: { date: "DESC" }
        })

        console.log("✅ Found sessions:", runSession.length);

        return runSession;
    }
}