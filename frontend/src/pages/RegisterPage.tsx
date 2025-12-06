import { RegisterForm } from "@/components/FormRegister";
import { Card } from "@/components/ui/card";

export default function Register() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Card className="p-6 md:p-10 space-y-6 w-full max-w-md">
                <div className="w-full max-w-lg">
                    <RegisterForm />
                </div>
            </Card>
        </div>
    )
}
