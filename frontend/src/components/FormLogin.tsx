import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation, type LoginMutation } from "@/generated/graphql-types";
import { useCurrentUser } from "@/hooks/useAuth";



export function LoginForm() {

    const [loginMutation] = useLoginMutation();
    const { refetch } = useCurrentUser();
    const navigate = useNavigate();

    const formLoginSchema = z.object({
        email: z.string().min(5, {
            message: "Please enter a valid email address.",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    })
    type LoginFormValues = z.infer<typeof formLoginSchema>;

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        loginMutation({
            variables: {
                data: { ...data }
            },
            onCompleted: async (result: LoginMutation) => { // ✅ async
                console.log("Login result:", result);
                if (result.login) {
                    await refetch(); // ✅ Refetch l'utilisateur
                    toast.success("Login successful! Welcome back.");
                    navigate("/");
                }
            },
            onError: (error: Error) => {
                console.error("Login error:", error);
                toast.error("Login failed. Please check your credentials and try again.");
            }
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                We'll use this to contact you.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormDescription>
                                Must be at least 6 characters long.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Login</Button>
            </form>
        </Form>
    )
}

