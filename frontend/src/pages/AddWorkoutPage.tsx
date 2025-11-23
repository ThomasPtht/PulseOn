import FormRunning from '@/components/FormRunning'
import FormWorkout from '@/components/FormWorkout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'


const AddWorkoutPage = () => {
    return (
        <div>
            <h1 className='flex flex-col items-center'>Nouvelle Séance</h1>
            <p className='flex flex-col text-muted-foreground mb-6 items-center'>Enregistrez votre séance</p>

            <Tabs defaultValue="strenght" className='flex items-center w-full max-w-m' >
                <TabsList className='w-4xl h-12'>
                    <TabsTrigger value="strenght" className='text-lg'> 💪 Musculation</TabsTrigger>
                    <TabsTrigger value="running" className='text-lg'>🏃‍♂️Running</TabsTrigger>
                </TabsList>

                <TabsContent value="strenght">

                    <FormWorkout />
                </TabsContent>
                <TabsContent value="running">
                    <FormRunning /></TabsContent>

            </Tabs>
        </div >

    )
}

export default AddWorkoutPage
