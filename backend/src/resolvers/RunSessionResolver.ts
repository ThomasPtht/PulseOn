import { User } from "../entities/User";
import { RunSession } from "../entities/RunSession";
import { RunSessionInput } from "../inputs/RunSessionInput";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver(RunSession)
export class RunSessionResolver {
    @Mutation(() => RunSession)
    async createRunSession(@Arg("data") data: RunSessionInput, @Ctx() context: any) {

        const user = await User.findOneBy({ id: context.user.id })
        if (!user) {
            throw new Error("User not found");
        }

        const newRunSession = await RunSession.save({
            ...data,
            user,
        })
        console.log("New run session created for user:", user?.id);
        // ✅ Recharger la session avec ses relations pour s'assurer que tout est bien retourné
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
        const user = await User.findOneBy({ id: context.user.id })
        if (!user) {
            throw new Error("User not found");
        }
        const runSession = await RunSession.find({
            where: { user: { id: user.id } },
            relations: ["user"], // Charge la relation user
            order: { date: "DESC" } // Trie par date décroissante
        })
        if (!runSession) {
            throw new Error("Run session not found for this user");
        }
        return runSession;
    }


}