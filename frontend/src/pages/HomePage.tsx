import CardStats from "@/components/CardStats"
import RecentsSessions from "@/components/RecentsSessions"



const HomePage = () => {
    console.log("HomePage mounted"); // ✅ Debug
    return (
        <div className="space-y-6">
            <div className="flex gap-2">
                <CardStats title={"Séances ce mois"} value={"blabablaaaaaaiiiddd"} icon="💪" />
                <CardStats title={"Temps Total"} value={"lala"} icon="⏱️" />
                <CardStats title={"Record personnel"} value={"lalaala"} icon="📈" />
            </div>
            <RecentsSessions />
        </div>
    )
}

export default HomePage