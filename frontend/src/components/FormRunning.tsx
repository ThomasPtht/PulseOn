import { useForm } from "react-hook-form"
import { Card, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Input } from "./ui/input"
import { useCreateRunSessionMutation } from "@/generated/graphql-types"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const formRunningSchema = z.object({
  date: z.date(),
  distance: z.number().min(0, { message: "Distance must be a positive number." }),
  duration: z.number().min(0, { message: "Duration must be a positive number." }),
  avgPace: z.string().min(1, { message: "Average pace is required." }),
  elevation: z.number().min(0, { message: "Elevation must be a positive number." }),
})


const FormRunning = () => {

  const [RunningSession] = useCreateRunSessionMutation();
  const navigate = useNavigate();



  const form = useForm<z.infer<typeof formRunningSchema>>({
    resolver: zodResolver(formRunningSchema),
    defaultValues: {
      date: undefined,
      distance: undefined,
      duration: undefined,
      avgPace: "",
      elevation: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formRunningSchema>) {
    RunningSession({
      variables: {
        data: {
          date: values.date,
          distance: values.distance,
          duration: values.duration,
          avgPace: values.avgPace,
          elevation: values.elevation,
        }
      },
      onCompleted: () => {
        toast.success("Session de course ajoutée avec succès !");
        navigate("/");
      }
      ,
      onError: (error: Error) => {
        console.error("Erreur lors de l'ajout de la session de course :", error);
        toast.error("Échec de l'ajout de la session de course. Veuillez réessayer.");
      }
    }
    )
    console.log(values)
  }



  return (

    <div>
      <Card className="p-4 w-30 sm:w-40 md:w-48 lg:w-60 xl:w-72 2xl:w-80 ">
        <CardTitle className="text-lg mb-4">Détails de la course</CardTitle>
        <div className="space-y-4">Enregistrez les informations de votre séance de course ici.</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
              control={form.control}
              name="date"
              render={({ }) => (
                <FormItem>
                  <FormLabel >Date</FormLabel>
                  <FormControl>
                    {/* <Input
                      {...field}
                      placeholder=""

                      aria-label=""

                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Distance (km) </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="25.4"

                      aria-label=""

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Durée (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="30:15"

                      aria-label="Durée de la course"

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avgPace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Allure (min/km)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="5:30"
                      aria-label="Allure moyenne"

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="elevation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Dénivelé (mètres)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="135"

                      aria-label="Dénivelé en mètres"

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

      </Card>
    </div>
  )
}



export default FormRunning
