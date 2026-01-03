import Drawer from "@mui/material/Drawer";
import OpcoesMenu from "./OpcoesMenu";
import { Box } from "@mui/material";

export default function NavBar({ state }) {
    const { open, setOpen } = state;

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                className="md:hidden"
            >
                <Box
                    sx={{
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                    }}
                >
                    <OpcoesMenu toggleDrawer={setOpen} />
                </Box>
            </Drawer>

            <div className="hidden md:block">
                <OpcoesMenu toggleDrawer={setOpen} />
            </div>
        </>
    );
}
