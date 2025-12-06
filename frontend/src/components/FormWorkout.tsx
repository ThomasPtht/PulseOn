import z from "zod"
import { Card, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { Button } from "./ui/button"


const formWorkoutSchema = z.object({
    date: z.string().min(1, { message: "Date is required." }),
    name: z.string().min(1, { message: "Title is required." }),
    distance: z.number().min(0, { message: "Distance must be a positive number." }),
    duration: z.number().min(0, { message: "Duration must be a positive number." }),
    avgPace: z.string().min(1, { message: "Average pace is required." }),
    elevation: z.number().min(0, { message: "Elevation must be a positive number." }),
})


type FormWorkoutValues = z.infer<typeof formWorkoutSchema>

const FormWorkout = () => {
    // const [WorkoutSession] = useCreateRunWorkoutMutation();
    const navigate = useNavigate();

    const form = useForm<FormWorkoutValues>({
        resolver: zodResolver(formWorkoutSchema),
        defaultValues: {
            date: "",
            name: "",
            distance: 0,
            duration: 0,
            avgPace: "",
            elevation: 0,
        },
    })

    // function onSubmit(values: FormWorkoutValues) {
    //     WorkoutSession({
    //         variables: {
    //             data: {
    //                 date: new Date(values.date).toISOString(),
    //                 title: values.title,
    //                 distance: values.distance,
    //                 duration: values.duration,
    //                 avgPace: values.avgPace,
    //                 elevation: values.elevation,
    //             }
    //         },
    //         onCompleted: () => {
    //             toast.success("Session de musculation ajoutée avec succès !");
    //             navigate("/");
    //         },
    //         onError: (error: Error) => {
    //             console.error("Erreur lors de l'ajout de la session de musculation :", error);
    //             toast.error("Échec de l'ajout de la session de musculation. Veuillez réessayer.");
    //         }
    //     })
    // }

    return (
        <div>
            <Card className=" p-6 w-full max-w-4xl mt-6" >
                <CardTitle>Ajouter un exercice</CardTitle>
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Ex: Développé couché, Squat..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}

                    />
                </Form>
                <Button> Ajouter</Button>

            </Card>


            <Card className="p-4 mt-6">
                <p>{name}</p>


                <Button className="mt-4"> Ajouter une série</Button>
            </Card>

            <Card className="w-full mt-6 p-8 flex justify-center items-center_center">
                <div className="flex flex-col items-center text-muted-foreground">
                    <div className="text-5xl mb-4">
                        💪</div>
                    <p>Aucun exercice ajouté</p>
                    <p>Commencez par ajouter un exercice ci-dessus</p>
                </div>
            </Card>
        </div>
    )
}

export default FormWorkout
