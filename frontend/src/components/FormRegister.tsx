import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterMutation } from "@/generated/graphql-types";



export function RegisterForm() {

    const [registerMutation] = useRegisterMutation();
    const navigate = useNavigate();

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string().min(5, {
            message: "Please enter a valid email address.",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        registerMutation({
            variables: {
                data: { ...data }
            },
            onCompleted: () => {

                navigate("/login");
                toast.success("Enregistrement réussi ! Vous pouvez maintenant vous connecter.");
            },
            onError: (error: Error) => {
                console.error("Registration error:", error);
                toast.error("Enregistrement échoué, veuillez réessayer.");
            }
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom d'utilisateur</FormLabel>
                            <FormControl>
                                <Input placeholder="johndoe" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ceci sera votre nom d'utilisateur public.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                                Nous utiliserons cet email pour vous contacter.
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
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormDescription>
                                Doit être composé d'au moins 6 caractères.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <Button type="submit" className="w-full max-w-xs">Créer un compte</Button>
                    </div>
                    <Link to="/login" className="text-sm text-primary hover:underline flex justify-center">
                        <p>Se connecter</p>
                    </Link>
                </div>
            </form>
        </Form>
    )
}

