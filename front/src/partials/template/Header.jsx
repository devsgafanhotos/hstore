import MenuIcon from "@mui/icons-material/Menu";
import MyButton from "../../components/form/MyButton";
import MyLinkButton from "../../components/form/MyLinkButton";
import { useAuth } from "../../hooks/useAuth";

export default function Header({ state }) {
    const { open, setOpen } = state;
    const { user } = useAuth();

    return (
        <header className="bg-transparent h-13 flex justify-between pr-4 pt-1">
            <div className="md:hidden">
                <MyButton
                    type="text"
                    sx={{ backgroundColor: "transparent" }}
                    handleClick={() => {
                        setOpen(!open);
                    }}
                >
                    <MenuIcon sx={{ fontSize: 30 }} />
                </MyButton>
            </div>
            {!user && (
                <div className="flex-1 flex items-center justify-end">
                    <MyLinkButton to={"/login"} title={"Entrar"} />
                </div>
            )}
        </header>
    );
}
