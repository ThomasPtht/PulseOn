import { useGetMyRunSessionsQuery, useGetMyWorkoutSessionsQuery } from '@/generated/graphql-types'
import { Card } from './ui/card'
import RunSessionCard from './RunSessionCard'
import StrenghtSessionCard from './StrenghtSessionCard'

const RecentsSessions = () => {

    const { data: runData, loading: runLoading, error: runError } = useGetMyRunSessionsQuery()
    const { data: workoutData, loading: workoutLoading, error: workoutError } = useGetMyWorkoutSessionsQuery() // ✅ Hook séparé

    if (runLoading || workoutLoading) return <p>Chargement des séances...</p>
    if (runError) return <p>Erreur : {runError.message}</p>
    if (workoutError) return <p>Erreur : {workoutError.message}</p>

    const runSessions = runData?.getMyRunSessions ?? []
    const workoutSessions = workoutData?.getMyWorkoutSessions ?? [] // ✅ Bonne query

    // ✅ Fusionner et trier par date
    const allSessions = [
        ...runSessions.map(s => ({ ...s, type: 'run' as const })),
        ...workoutSessions.map(s => ({ ...s, type: 'workout' as const }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div>
            <Card className="p-6 w-5xl">
                <h2 className="text-lg font-semibold mb-4">Séances récentes</h2>

                {allSessions.length === 0 ? (
                    <p className="text-muted-foreground">Pas de séances récentes.</p>
                ) : (
                    <div className="space-y-4">
                        {allSessions.map((session) =>
                            session.type === 'run' ? (
                                <RunSessionCard
                                    key={`run-${session.id}`}
                                    id={session.id}
                                    title={session.title ?? null}
                                    date={session.date}
                                    distance={session.distance}
                                    duration={session.duration}
                                    pace={session.avgPace}
                                    elevation={session.elevation}
                                />
                            ) : (
                                <StrenghtSessionCard
                                    key={`workout-${session.id}`}
                                    id={session.id}
                                    date={session.date}
                                    sets={session.sets}
                                />
                            )
                        )}
                    </div>
                )}
            </Card>
        </div>
    )
}

export default RecentsSessions