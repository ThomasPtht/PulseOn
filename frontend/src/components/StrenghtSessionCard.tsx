import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"


interface StrenghtSessionCardProps {
    id: string
    title: string | null
    date: string
    duration: number
    exercise: string
    sets: number
}

const StrenghtSessionCard = ({ date, title, exercise, duration, sets }: StrenghtSessionCardProps) => {

    const relativeDate = formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });

    console.log({ title })

    return (
        <div className="flex border rounded-lg p-4 hover:bg-accent transition-colors">
            {/* Logo à gauche */}
            <div className="flex items-center mr-4">
                <div className="p-3 bg-orange-100 rounded-2xl text-4xl">🏃</div>
            </div>
            {/* Contenu à droite */}
            <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between w-full mb-1">
                    <h4 className="text-xl font-semibold text-balance">{title}</h4>
                    <Badge variant="outline" className="ml-2 px-4 py-1 rounded-full text-sm bg-gray-200">
                        Musculation
                    </Badge>
                </div>
                <p className="font-medium text-muted-foreground">
                    {relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1)}
                </p>
                <div className="flex gap-4 mt-2 text-muted-foreground text-lg">
                    <div className="flex items-center">
                        ⏱️
                        <p className="font-semibold ml-1">{duration} min</p>
                    </div>
                    <div className="flex items-center">
                        🏋  ️
                        <p className="font-semibold ml-1">{exercise}</p>
                    </div>
                    <div>
                        <p className="font-semibold">{sets} /km</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StrenghtSessionCard