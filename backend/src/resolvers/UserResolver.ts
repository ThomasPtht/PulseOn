import { Query, Resolver } from "type-graphql";
import { User } from "../entities/User";


@Resolver()
export class UserResolver {
    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        const users = await User.find();
        if (!users || users.length === 0) {
            throw new Error("No users found");
        }
        return users;
    }



}
