import { useGetMyRunSessionsQuery, type RunSession } from '@/generated/graphql-types'
import { Card } from './ui/card'
import RunSessionCard from './RunSessionCard'


const RecentsSessions = () => {

    const { data, loading, error } = useGetMyRunSessionsQuery()

    if (loading) return <p>Chargement des séances...</p>
    if (error) return <p>Erreur lors du chargement des séances : {error.message}</p>

    const sessions = data?.getMyRunSessions ?? [] // ✅ Ajoute cette ligne

    return (
        <div>
            <Card className="p-6 w-5xl">
                <h2 className="text-lg font-semibold mb-4">Séances récentes</h2>

            

                {sessions.length === 0 ? (
                    <p className="text-muted-foreground">Pas de séances récentes.</p>
                ) : (
                    <div className="space-y-4">
                        {sessions.map((session) => (
                            <RunSessionCard
                                key={session.id}
                                id={session.id}
                                title={session.title ?? null}
                                date={session.date}
                                distance={session.distance}
                                duration={session.duration}
                                pace={session.avgPace}
                                elevation={session.elevation}
                            />
                        ))}
                    </div>
                )}
            </Card>
        </div>
    )
}

export default RecentsSessions