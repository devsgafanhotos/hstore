import Navbar from "./sections/NavBar";
import { Outlet } from "react-router-dom";
export default function PublicLayout() {
    return (
        <div className="h-[97.6vh] flex flex-col">
            <Navbar />
            <main className="flex-1 flex bg-(--color-gray) overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
