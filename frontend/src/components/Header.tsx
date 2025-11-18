import { Activity, Bell, Menu, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
    return (
        <header className="border-b border-border bg-card">
            <div className="container mx-auto py-4 ">
                <div className="flex items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
                                <Activity className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight">PulseOn</h1>
                                <p className="text-xs text-muted-foreground">Fitness Tracker</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button size="sm" className="gap-2 hidden sm:flex">
                            <Plus className="h-4 w-4" />
                            Nouvelle séance
                        </Button>
                        <Button size="icon" variant="ghost" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                        </Button>
                        <Avatar className="h-9 w-9 cursor-pointer">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" />
                            <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </header>
    )
}
