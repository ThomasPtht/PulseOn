import CardStats from "@/components/CardStats"
import RecentsSessions from "@/components/RecentsSessions"
import { useGetMyRunSessionsQuery } from "@/generated/graphql-types";



const HomePage = () => {

    const { data } = useGetMyRunSessionsQuery();

    const totalSessions = data?.getMyRunSessions.length || 0;
    const totalDuration = data?.getMyRunSessions.reduce((sum, session) => sum + session.duration, 0) || 0;



    console.log("HomePage mounted"); // ✅ Debug
    return (
        <div className="space-y-6">
            <div className="flex gap-2">
                <CardStats title={"Séances ce mois"} value={totalSessions} icon="💪" />
                <CardStats title={"Temps Total"} value={totalDuration} icon="⏱️" />
                <CardStats title={"Record personnel"} value={"lalaala"} icon="📈" />
            </div>
            <RecentsSessions />
        </div>
    )
}

export default HomePage