import AddSessionCard from "@/components/AddSessionCard";
import CardStats from "@/components/CardStats"
import RecentsSessions from "@/components/RecentsSessions"
import { useGetMyRunSessionsQuery, useGetMyWorkoutSessionsQuery } from "@/generated/graphql-types";
import calculateCurrentStreak from "@/utils/calculateCurrentStreak";
import { Link } from "react-router";

const HomePage = () => {
    const { data: runData } = useGetMyRunSessionsQuery();
    const { data: workoutData } = useGetMyWorkoutSessionsQuery();

    const totalRunSessions = runData?.getMyRunSessions.length || 0;
    const totalWorkoutSessions = workoutData?.getMyWorkoutSessions.length || 0;

    const totalSessions = totalRunSessions + totalWorkoutSessions;

    const durationRunSessions = runData?.getMyRunSessions.reduce((acc, session) => acc + session.duration, 0) || 0;

    const currentStreak = calculateCurrentStreak();

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto space-y-6">
            <div className="flex gap-2 w-full">
                <CardStats className="flex-1" title={"Séances ce mois"} value={totalSessions} icon="💪" />
                <CardStats className="flex-1" title={"Temps Run Total"} value={durationRunSessions} icon="⏱️" />
                <CardStats className="flex-1" title={"Série actuelle"} value={currentStreak} icon="📈" />
            </div>

            <div className="flex gap-4 w-full">
                <Link to="/add-workout" className="flex-1">
                    <AddSessionCard title={"Musculation"} description={"Séance de renforcement musculaire"} icon="💪" />
                </Link>
                <Link to="/add-workout" className="flex-1">
                    <AddSessionCard title={"Running"} description={"Course à pied ou cardio"} icon="🏃" />
                </Link>
            </div>

            <div className="w-full">
                <RecentsSessions />
            </div>
        </div>
    )
}

export default HomePage