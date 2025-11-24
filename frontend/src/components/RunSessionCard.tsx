

interface RunSessionCardProps {
  id: string
  date: string
  distance: number
  duration: number
  pace: string
  elevation: number
}

const RunSessionCard = ({ date, distance, duration, pace, elevation }: RunSessionCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-accent transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">
          {date}
        </h3>


        <div className="flex ">
          <div>
            <p className="text-muted-foreground">Durée</p>
            <p className="font-semibold">{duration} min</p>
          </div>
          <div>
            <p className="text-muted-foreground">Distance</p>
            <p className="font-semibold">{distance} km</p>
          </div>
          <div>
            <p className="text-muted-foreground">Allure</p>
            <p className="font-semibold">{pace} /km</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RunSessionCard
