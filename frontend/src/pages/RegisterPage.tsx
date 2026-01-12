import { RegisterForm } from "@/components/FormRegister";
import { Card } from "@/components/ui/card";

export default function Register() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Rejoignez PulseOn
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Enregistrez-vous dès maintenant afin de tracker vos séances de sport
                    </p>
                </div>

                <Card className="p-8 shadow-lg">
                    <RegisterForm />
                </Card>
            </div>
        </div>
    )
}
