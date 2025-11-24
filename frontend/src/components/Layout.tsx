import { Outlet } from "react-router"
import { Header } from "./Header"



const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 p-6 bg-gray-50 w-full">

                <Outlet />
            </main>

        </div>
    )
}

export default Layout