import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router";
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
            onCompleted: async (result: LoginMutation) => {
                console.log("Login result:", result);
                if (result.login) {
                    await refetch();
                    toast.success("Connexion réussie, bon entraînement !");
                    // Recharger la page pour garantir un état propre
                    window.location.href = "/";
                }
            },
            onError: (error: Error) => {
                console.error("Login error:", error);
                toast.error("Connexion échouée, veuillez réessayer.");
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
                                Nous utilisons cet email uniquement pour la gestion de ton compte.
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
                        <Button type="submit" className="w-full max-w-xs">Se connecter</Button>
                    </div>
                    <Link to="/register" className="text-sm text-primary hover:underline flex justify-center">
                        <p>S'enregistrer</p>
                    </Link>
                </div>
            </form>
        </Form>
    )
}

