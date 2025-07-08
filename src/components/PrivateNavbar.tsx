import ThemeController from "./landingPage/ThemeController"

const PrivateNavbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Kanban.com</a>
            </div>
            <div className="navbar-end">
                <ThemeController />
                <button className="btn btn-error ml-2">Logout</button>
            </div>
        </div>
    )
}
export default PrivateNavbar