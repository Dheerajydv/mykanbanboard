import Footer from "@/components/landingPage/Footer"
import PrivateNavbar from "@/components/PrivateNavbar"
import React from "react"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <PrivateNavbar />
            {children}
            <Footer />
        </div>
    )
}
export default layout