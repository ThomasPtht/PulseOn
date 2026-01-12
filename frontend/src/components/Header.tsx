import { Activity, Bell, LogOut, Menu, Plus, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useNavigate } from 'react-router'
import useAuth from '@/hooks/useAuth'

import { useLogoutMutation } from '@/generated/graphql-types'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

export function Header() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

    const initials = user?.username ? user.username.charAt(0).toUpperCase() : "U"

    const handleLogout = async () => {
        try {
            await logout()
            toast.success("Déconnexion réussie")
            navigate("/login")
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error)
            toast.error("Erreur lors de la déconnexion")
        }
    }

    return (
        <header className="border-b border-border bg-card">
            <div className="container mx-auto py-4 ">
                <div className="flex items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                        <Link to="/">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
                                    <Activity className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold tracking-tight">PulseOn</h1>
                                    <p className="text-xs text-muted-foreground">Fitness Tracker</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Link to="/add-workout">
                            <Button size="sm" className="gap-2 hidden sm:flex">
                                <Plus className="h-4 w-4" />
                                Nouvelle séance
                            </Button>
                        </Link>
                        <Button size="icon" variant="ghost" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-9 w-9 cursor-pointer">
                                    <AvatarImage src="/placeholder.svg?height=36&width=36" />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{user?.username}</p>
                                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Mon profil</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Se déconnecter</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}