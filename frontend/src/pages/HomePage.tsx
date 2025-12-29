import AddSessionCard from "@/components/AddSessionCard";
import CardStats from "@/components/CardStats"
import RecentsSessions from "@/components/RecentsSessions"
import { useGetMyRunSessionsQuery } from "@/generated/graphql-types";
import { Link } from "react-router";

const HomePage = () => {
    const { data } = useGetMyRunSessionsQuery();
    const totalSessions = data?.getMyRunSessions.length || 0;
    const totalDuration = data?.getMyRunSessions.reduce((sum, session) => sum + session.duration, 0) || 0;

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto space-y-6">
            <div className="flex gap-2 w-full">
                <CardStats className="flex-1" title={"Séances ce mois"} value={totalSessions} icon="💪" />
                <CardStats className="flex-1" title={"Temps Total"} value={totalDuration} icon="⏱️" />
                <CardStats className="flex-1" title={"Record personnel"} value={"lalaala"} icon="📈" />
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