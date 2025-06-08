import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async getAllUsers() {
        const users = await User.find();
        if (!users || users.length === 0) {
            throw new Error("No users found");
        }
        return users;
    }

    @Query(() => User, { nullable: true })
    async getUserById(@Arg("id") id: number) {
        const user = await User.findOneBy({ id });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return user;
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

    @Mutation(() => String)
    async login(@Arg("data", () => UserInput) userData: UserInput) {
        const user = await User.findOneBy({
            username: userData.username,
            password: userData.password,
        });
        if (!user) {
            throw new Error("Invalid username or password");
        }
        return `User ${user.username} logged in successfully`;
    }
}
