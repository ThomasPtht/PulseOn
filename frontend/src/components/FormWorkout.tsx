import { Card, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate } from "react-router"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useNewWorkoutSessionMutation, useCreateExerciseMutation, useGetExercisesQuery } from "@/generated/graphql-types"

const setSchema = z.object({
    repetitions: z.number().min(1, { message: "Au moins 1 répétition" }),
    weight: z.number().min(0, { message: "Poids >= 0" }),
})

type Set = z.infer<typeof setSchema>

type Exercise = {
    exerciseId: number
    name: string
    sets: Set[]
}

const FormWorkout = () => {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [currentExerciseName, setCurrentExerciseName] = useState("")
    const navigate = useNavigate()

    const { data: exercisesData } = useGetExercisesQuery()
    const [createExercise] = useCreateExerciseMutation()
    const [createWorkoutSession, { loading }] = useNewWorkoutSessionMutation()

    const handleAddExercise = async () => {
        if (!currentExerciseName.trim()) {
            toast.error("Veuillez entrer un nom d'exercice")
            return
        }

        try {
            // Chercher si l'exercice existe déjà
            const existingExercise = exercisesData?.getExercises.find(
                ex => ex.name.toLowerCase() === currentExerciseName.toLowerCase()
            )

            let exerciseId: number

            if (existingExercise) {
                exerciseId = Number(existingExercise.id)
            } else {
                // Créer un nouvel exercice
                const result = await createExercise({
                    variables: { name: currentExerciseName }
                })
                exerciseId = Number(result.data!.createExercise.id)
            }

            const newExercise: Exercise = {
                exerciseId,
                name: currentExerciseName,
                sets: []
            }

            setExercises([...exercises, newExercise])
            setCurrentExerciseName("")
            toast.success("Exercice ajouté !")
        } catch (error) {
            console.error("Erreur:", error)
            toast.error("Erreur lors de l'ajout de l'exercice")
        }
    }

    const handleAddSet = (exerciseIndex: number, repetitions: number, weight: number) => {
        const newExercises = [...exercises]
        newExercises[exerciseIndex].sets.push({ repetitions, weight })
        setExercises(newExercises)
        toast.success("Série ajoutée !")
    }

    const handleRemoveExercise = (exerciseIndex: number) => {
        setExercises(exercises.filter((_, i) => i !== exerciseIndex))
        toast.success("Exercice supprimé")
    }

    const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
        const newExercises = [...exercises]
        newExercises[exerciseIndex].sets = newExercises[exerciseIndex].sets.filter((_, i) => i !== setIndex)
        setExercises(newExercises)
    }

    const handleSubmit = async () => {
        if (exercises.length === 0) {
            toast.error("Ajoutez au moins un exercice")
            return
        }

        try {
            const payload = {
                date: new Date().toISOString(),
                exercises: exercises.map(ex => ({
                    exerciseId: Number(ex.exerciseId), // ✅ Forcez la conversion ici aussi
                    sets: ex.sets.map(s => ({
                        repetitions: Number(s.repetitions), // ✅ Assurez-vous que c'est un nombre
                        weight: Number(s.weight), // ✅ Assurez-vous que c'est un nombre
                        restSeconds: 60,
                        isWarmup: false
                    }))
                }))
            }

            console.log("Payload envoyé:", JSON.stringify(payload, null, 2)) // ✅ Debug

            await createWorkoutSession({
                variables: {
                    data: payload
                }
            })

            toast.success("Séance enregistrée !")
            navigate("/")
        } catch (error) {
            console.error("Erreur:", error)
            toast.error("Erreur lors de l'enregistrement")
        }
    }

    return (
        <div>
            <Card className="p-6 w-full max-w-4xl mt-6">
                <CardTitle>Ajouter un exercice</CardTitle>
                <div className="flex gap-2 mt-4">
                    <Input
                        value={currentExerciseName}
                        onChange={(e) => setCurrentExerciseName(e.target.value)}
                        placeholder="Ex: Développé couché, Squat..."
                    />
                    <Button onClick={handleAddExercise}>Ajouter</Button>
                </div>
            </Card>

            {exercises.length === 0 ? (
                <Card className="w-full mt-6 p-8 flex justify-center">
                    <div className="flex flex-col items-center text-muted-foreground">
                        <div className="text-5xl mb-4">💪</div>
                        <p>Aucun exercice ajouté</p>
                        <p className="text-sm">Commencez par ajouter un exercice ci-dessus</p>
                    </div>
                </Card>
            ) : (
                exercises.map((exercise, exerciseIndex) => (
                    <ExerciseCard
                        key={exerciseIndex}
                        exercise={exercise}
                        exerciseIndex={exerciseIndex}
                        onAddSet={handleAddSet}
                        onRemoveExercise={handleRemoveExercise}
                        onRemoveSet={handleRemoveSet}
                    />
                ))
            )}

            {exercises.length > 0 && (
                <Button
                    className="w-full mt-6"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Enregistrement..." : "Enregistrer la séance"}
                </Button>
            )}
        </div>
    )
}

type ExerciseCardProps = {
    exercise: Exercise
    exerciseIndex: number
    onAddSet: (exerciseIndex: number, reps: number, weight: number) => void
    onRemoveExercise: (exerciseIndex: number) => void
    onRemoveSet: (exerciseIndex: number, setIndex: number) => void
}

const setFormSchema = z.object({
    repetitions: z.number().min(1, { message: "Au moins 1 répétition" }),
    weight: z.number().min(0, { message: "Poids >= 0" }),
})

type SetFormValues = z.infer<typeof setFormSchema>

const ExerciseCard = ({ exercise, exerciseIndex, onAddSet, onRemoveExercise, onRemoveSet }: ExerciseCardProps) => {
    const form = useForm<SetFormValues>({
        resolver: zodResolver(setFormSchema),
        defaultValues: {
            repetitions: 10,
            weight: 20,
        },
    })

    const onSubmit = (values: SetFormValues) => {
        onAddSet(exerciseIndex, values.repetitions, values.weight)
        form.reset()
    }

    return (
        <Card className="p-4 mt-6">
            <div className="flex justify-between items-center mb-4">
                <CardTitle>{exercise.name}</CardTitle>
                <Button variant="destructive" size="icon" onClick={() => onRemoveExercise(exerciseIndex)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            <div className="space-y-2 mb-4">
                {exercise.sets.map((set, setIndex) => (
                    <div key={setIndex} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span>Série {setIndex + 1}: {set.repetitions} reps × {set.weight}kg</span>
                        <Button variant="ghost" size="icon" onClick={() => onRemoveSet(exerciseIndex, setIndex)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-2">
                    <FormField
                        control={form.control}
                        name="repetitions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Répétitions</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="10"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Poids (kg)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.5"
                                        placeholder="20"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-end">
                        <Button type="submit" className="w-full">
                            Ajouter série
                        </Button>
                    </div>
                </form>
            </Form>
        </Card>
    )
}

export default FormWorkout