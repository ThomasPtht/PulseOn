import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";

@Resolver()
export class UserResolver {

    @Query(() => String)
    hello() {
        return "Hello from PulseOn!";
    }

    @Mutation(() => String)
    async registerUser(@Arg("data", () => UserInput) newUserData: UserInput) {
        const isUserExists = await User.findOneBy({ email: newUserData.email });
        if (isUserExists) {
            throw new Error("User already exists");
        }
        const result = await User.save({
            username: newUserData.username,
            password: newUserData.password,
            email: newUserData.email,
        })
        if (!result) {
            throw new Error("Failed to register user");
        }
        return "User registered successfully";
    }
}
