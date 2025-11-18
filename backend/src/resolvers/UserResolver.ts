import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../entities/User";
import * as argon2 from "argon2";
import { UserInput } from "../inputs/UserInput";



@Resolver(User)
export class UserResolver {
    @Mutation(() => String)
    async register(@Arg("data") newUserData: UserInput) {
        const newUser = await User.save({
            email: newUserData.email,
            username: newUserData.username,
            createdAt: new Date(),
            password: await argon2.hash(newUserData.password),
        })
        console.log("New user registered:", newUser);
        return "Registration successful";
    }

    @Query(() => String)
    hello() {
        return "Hello from PulseOn API";
    }

    @Mutation(() => String)
    async login(@Arg("data") loginUserInput: UserInput, @Ctx() context: any) {
        let isPasswordCorrect = false
        const user = await User.findOneBy({ email: loginUserInput.email })
        if (user) {
            isPasswordCorrect = await argon2.verify(
                user.password,
                loginUserInput.password
            )
        }
        if (isPasswordCorrect && user !== null) {
            const token = jwt.sign(
                { email: user.email, id: user.id },
                process.env.JWT_SECRET_KEY as Secret, { expiresIn: "1h" }
            )
            context.res.setHeader("Set-Cookie", `token=${token}; HttpOnly; SameSite=Lax; Path=/`)
            return token

        } else {
            throw new Error("Incorrect login")
        }
    }


    @Mutation(() => String)
    async logout(@Ctx() context: any) {
        context.res.setHeader("Set-Cookie",
            `token=; Secure; HttpOnly;expires=${new Date(Date.now()).toUTCString()}`)
        return "Logged out successfully";

    }

}
