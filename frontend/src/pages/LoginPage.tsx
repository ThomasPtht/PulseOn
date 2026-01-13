import { LoginForm } from "@/components/FormLogin"
import { Card } from "@/components/ui/card"

const LoginPage = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-3">
                    <h1 className="highlight highlight-indigo-600 text-4xl font-bold tracking-tight">
                        Bon retour sur PulseOn !
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Connecte-toi pour tracker tes dernières séances
                    </p>
                </div>

                <Card className="p-8 shadow-lg">
                    <LoginForm />
                </Card>
            </div>
        </div>
    )
}

export default LoginPage
