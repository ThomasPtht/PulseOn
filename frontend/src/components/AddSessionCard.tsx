
import { Plus, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardTitle } from './ui/card'

type CardSessionProps = {
    title: string;
    description: string;
    icon: string;
}

const AddSessionCard = ({ title, icon, description }: CardSessionProps) => {
    return (
        <div>

            <Card className="p-4 w-full transition-transform duration-200 hover:scale-102 hover:shadow-xl">
                <div className="flex flex-col gap-6 justify-between items-start mb-2">
                    <div className='flex items-center justify-between w-full'>
                        <div className="text-2xl p-2 bg-red-100 rounded-md">{icon}
                        </div><Plus /></div>
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>
                </div>
                <CardContent className="p-0">
                    <div className="text-muted-foreground">{description}</div>
                </CardContent>
            </Card>


        </div>
    )
}

export default AddSessionCard
