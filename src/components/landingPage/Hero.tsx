"use client"

import { useRouter } from "next/navigation"

const Hero = () => {
    const router = useRouter();
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        Kanban.com is a simple kanban board web app where you can manage your tasks.
                    </p>
                    <button onClick={() => { router.push("/register") }} className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}
export default Hero