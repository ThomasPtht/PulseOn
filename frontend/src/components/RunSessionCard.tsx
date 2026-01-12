import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Trash } from "lucide-react"
import { useDeleteRunSessionMutation } from "@/generated/graphql-types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { toast } from "sonner"



interface RunSessionCardProps {
  id: string
  title: string | null
  date: string
  distance: number
  duration: number
  pace: string
  elevation: number
}

const RunSessionCard = ({ id, date, title, distance, duration, pace }: RunSessionCardProps) => {

  const relativeDate = formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });

  const [deleteSession] = useDeleteRunSessionMutation({
    variables: { id: parseFloat(id) },
    refetchQueries: ['GetMyRunSessions', 'GetMyWorkoutSessions'],
    onCompleted: () => {
      toast.success("Séance supprimée avec succès !");
    }
  });

  const handleDelete = () => {
    deleteSession();
  };

  return (
    <div className="flex border rounded-lg p-4 hover:bg-accent transition-colors">
      {/* Logo à gauche */}
      <div className="flex items-center mr-4">
        <div className="p-3 bg-orange-100 rounded-2xl text-4xl">🏃</div>
      </div>
      {/* Contenu à droite */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between w-full mb-1">
          <h4 className="text-xl font-semibold text-balance">{title}</h4>
          <Badge variant="outline" className="ml-2 px-4 py-1 rounded-full text-sm bg-gray-200">
            Running
          </Badge>
        </div>
        <p className="font-medium text-muted-foreground">
          {relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1)}
        </p>
        <div className="flex gap-4 mt-2 text-muted-foreground text-lg">
          <div className="flex items-center">
            ⏱️
            <p className="font-semibold ml-1">{duration} min</p>
          </div>
          <div className="flex items-center">
            📍
            <p className="font-semibold ml-1">{distance} km</p>
          </div>
          <div>
            <p className="font-semibold">{pace} /km</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto hover:bg-destructive/10"

              >
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer cette séance ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. La séance "{title}" du {new Date(date).toLocaleDateString('fr-FR')} sera définitivement supprimée.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

export default RunSessionCard