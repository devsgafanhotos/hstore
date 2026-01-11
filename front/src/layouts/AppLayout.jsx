import { useState } from "react";
import NavBar from "../partials/template/NavBar";
import Button from "@mui/material/Button";
import { LuMenu } from "react-icons/lu";
import { useAuth } from "../hooks/useAuth";

export default function AppLayout({ children }) {
    const { user } = useAuth()
    const [open, setOpen] = useState(false);

    return (
        <div className="h-screen flex">
            <NavBar state={{ open, setOpen }} />
            <div className="flex-1 flex flex-col bg-(--color-gray)">
                <header className="md:hidden">
                    <Button
                        variant="text"
                        sx={{ backgroundColor: "transparent" }}
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        <LuMenu className="text-3xl text-(--color-secondary)" />
                    </Button>
                </header>
                <main className="flex-1 flex p-2 md:p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
