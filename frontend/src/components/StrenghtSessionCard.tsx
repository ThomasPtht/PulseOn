import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"

type Set = {
    id: string
    repetitions: number
    weight: number
    restSeconds?: number | null
    isWarmup?: boolean | null
    exercise: {
        id: string
        name: string
    }
}

type StrenghtSessionCardProps = {
    id: string
    date: string
    sets: Set[]
}

const StrenghtSessionCard = ({ date, sets }: StrenghtSessionCardProps) => {
    const relativeDate = formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr })

    // Grouper les sets par exercice
    const exerciseGroups = sets.reduce((acc, set) => {
        const exerciseName = set.exercise.name
        if (!acc[exerciseName]) {
            acc[exerciseName] = []
        }
        acc[exerciseName].push(set)
        return acc
    }, {} as Record<string, Set[]>)

    const totalSets = sets.length
    const exerciseCount = Object.keys(exerciseGroups).length

    // Calculer le volume total (reps × poids)
    const totalVolume = sets.reduce((sum, set) => sum + (set.repetitions * set.weight), 0)

    return (
        <div className="flex border rounded-lg p-4 hover:bg-accent transition-colors">
            {/* Logo à gauche */}
            <div className="flex items-center mr-4">
                <div className="p-3 bg-orange-100 rounded-2xl text-4xl">💪</div>
            </div>

            {/* Contenu à droite */}
            <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between w-full mb-1">
                    <h4 className="text-xl font-semibold text-balance">
                        Séance de musculation
                    </h4>
                    <Badge variant="outline" className="ml-2 px-4 py-1 rounded-full text-sm bg-gray-200">
                        Musculation
                    </Badge>
                </div>

                <p className="font-medium text-muted-foreground">
                    {relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1)}
                </p>

                <div className="flex gap-4 mt-2 text-muted-foreground text-lg">
                    <div className="flex items-center">
                        🏋️
                        <p className="font-semibold ml-1">{exerciseCount} exercice{exerciseCount > 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center">
                        📊
                        <p className="font-semibold ml-1">{totalSets} série{totalSets > 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center">
                        ⚖️
                        <p className="font-semibold ml-1">{totalVolume.toFixed(0)} kg</p>
                    </div>
                </div>

                {/* Liste des exercices */}
                <div className="mt-3 text-sm text-muted-foreground">
                    {Object.entries(exerciseGroups).map(([exerciseName, exerciseSets]) => (
                        <span key={exerciseName} className="inline-block mr-3">
                            {exerciseName} ({exerciseSets.length})
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StrenghtSessionCard