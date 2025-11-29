import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'


type CardStatsProps = {
    title: string;
    value: number | string;
    icon: string;
}

const CardStats = ({ title, icon, value }: CardStatsProps) => {
    return (
        <Card className="p-4 w-30 sm:w-40 md:w-48 lg:w-60 xl:w-72 2xl:w-80">
            <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-sm">{title}</CardTitle>
                <div className="text-2xl p-2 bg-red-100 rounded-md">{icon}</div>
            </div>
            <CardContent className="p-0">
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}

export default CardStats
