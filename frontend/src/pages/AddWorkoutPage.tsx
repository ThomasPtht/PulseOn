import FormRunning from '@/components/FormRunning'
import FormWorkout from '@/components/FormWorkout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const AddWorkoutPage = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className='mb-2'>Nouvelle Séance</h1>
            <p className='text-muted-foreground mb-6'>Enregistrez votre séance</p>

            <Tabs defaultValue="strenght" className='w-full max-w-4xl'>
                <TabsList className='w-full h-12'>
                    <TabsTrigger value="strenght" className='text-lg'> 💪 Musculation</TabsTrigger>
                    <TabsTrigger value="running" className='text-lg'>🏃‍♂️Running</TabsTrigger>
                </TabsList>

                <TabsContent value="strenght" className="w-full">
                    <FormWorkout />
                </TabsContent>
                <TabsContent value="running" className="w-full">
                    <FormRunning />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AddWorkoutPage