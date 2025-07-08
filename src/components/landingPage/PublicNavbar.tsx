"use client"

import { useRouter } from "next/navigation"
import ThemeController from "./ThemeController";

const PublicNavbar = () => {
    const router = useRouter();
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Kanban.com</a>
            </div>
            <div className="navbar-end">
                <ThemeController />
                <button onClick={() => { router.push("/register") }} className="btn btn-primary ml-2">Get Started →</button>
            </div>
        </div>
    )
}
export default PublicNavbar