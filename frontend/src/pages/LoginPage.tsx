import { LoginForm } from "@/components/FormLogin"
import { Card } from "@/components/ui/card"


const LoginPage = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Card className="p-6 md:p-10 space-y-6 w-full max-w-md">
                <div className="w-full max-w-lg">
                    <LoginForm />
                </div>
            </Card>
        </div>
    )
}

export default LoginPage
