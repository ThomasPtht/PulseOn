import { Card, CardContent, CardTitle } from './ui/card'

type CardStatsProps = {
    title: string;
    value: number | string;
    icon: string;
    className?: string;
}

const CardStats = ({ title, icon, value, className }: CardStatsProps) => {
    return (
        <Card className={`p-4 flex flex-col ${className ?? ""}`}>
            <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-sm">{title}</CardTitle>
                <div className="text-2xl p-2 bg-red-100 rounded-md">{icon}</div>
            </div>
            <CardContent className="p-0">
                <div className="text-2xl font-bold text-left">{value}</div>
            </CardContent>
        </Card>
    )
}

export default CardStats