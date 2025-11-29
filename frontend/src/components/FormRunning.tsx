import { useForm } from "react-hook-form"
import { Card, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "./ui/input"
import { useCreateRunSessionMutation } from "@/generated/graphql-types"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { Button } from "./ui/button"

const formRunningSchema = z.object({
  date: z.string().min(1, { message: "Date is required." }),
  title: z.string().min(1, { message: "Title is required." }),
  distance: z.number().min(0, { message: "Distance must be a positive number." }),
  duration: z.number().min(0, { message: "Duration must be a positive number." }),
  avgPace: z.string().min(1, { message: "Average pace is required." }),
  elevation: z.number().min(0, { message: "Elevation must be a positive number." }),
})

type FormRunningValues = z.infer<typeof formRunningSchema>

const FormRunning = () => {
  const [RunningSession] = useCreateRunSessionMutation();
  const navigate = useNavigate();

  const form = useForm<FormRunningValues>({
    resolver: zodResolver(formRunningSchema),
    defaultValues: {
      date: "",
      title: "",
      distance: 0,
      duration: 0,
      avgPace: "",
      elevation: 0,
    },
  })

  function onSubmit(values: FormRunningValues) {
    RunningSession({
      variables: {
        data: {
          date: new Date(values.date).toISOString(),
          title: values.title,
          distance: values.distance,
          duration: values.duration,
          avgPace: values.avgPace,
          elevation: values.elevation,
        }
      },
      onCompleted: () => {
        toast.success("Session de course ajoutée avec succès !");
        navigate("/");
      },
      onError: (error: Error) => {
        console.error("Erreur lors de l'ajout de la session de course :", error);
        toast.error("Échec de l'ajout de la session de course. Veuillez réessayer.");
      }
    })
  }

  return (
    <div>
      <Card className="p-4 w-full max-w-md">
        <CardTitle className="text-lg mb-4">Détails de la course</CardTitle>
        <div className="mb-4 text-sm text-muted-foreground">
          Enregistrez les informations de votre séance de course ici.
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Course du matin" />
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
                  <FormLabel>Distance (km)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="25.4"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                  <FormLabel>Durée (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="30"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                  <FormLabel>Allure (min/km)</FormLabel>
                  <FormControl>
                    <Input placeholder="5:30" {...field} />
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
                  <FormLabel>Dénivelé (mètres)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="135"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Enregistrer la séance
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default FormRunning