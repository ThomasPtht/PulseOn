import CardStats from "@/components/CardStats"



const HomePage = () => {
    return (
        <div>
            <div className="flex gap-2">
                <CardStats title={"Séances ce mois"} value={"blabla"} icon="💪" />
                <CardStats title={"Temps Total"} value={"lala"} icon="⏱️" />
                <CardStats title={"Record personnel"} value={"lalaala"} icon="📈" />
            </div>
        </div>
    )
}

export default HomePage
