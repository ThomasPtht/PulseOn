import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"


interface RunSessionCardProps {
  id: string
  date: string
  distance: number
  duration: number
  pace: string
  elevation: number
}

const RunSessionCard = ({ date, distance, duration, pace, elevation }: RunSessionCardProps) => {

  const relativeDate = formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });

  return (
    <div className="border rounded-lg p-4 hover:bg-accent transition-colors">
      <div className="flex flex-col justify-between items-start mb-2">
        <div className="p-3 bg-orange-100 rounded-2xl text-4xl">🏃</div>
        <h3 className="font-medium ">
          {relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1)}
        </h3>


        <div className="flex gap-6 ">
          <div className="flex">
            ⏱️
            <p className="font-semibold">{duration} min</p>
          </div>
          <div className="flex">
            📍
            <p className="font-semibold">{distance} km</p>
          </div>
          <div>

            <p className="font-semibold">{pace} /km</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RunSessionCard
