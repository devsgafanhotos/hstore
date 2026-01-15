import Drawer from "@mui/material/Drawer";
import SidebarItems from "./SidebarItems";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function Sidebar({ drawerState }) {
    const { openDrawer, setOpenDrawer } = drawerState;
    const onCloseDrawer = () => setOpenDrawer(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{}}>
            <Drawer
                open={openDrawer}
                onClose={onCloseDrawer}
                anchor="left"
                PaperProps={{
                    sx: {},
                }}
            >
                <SidebarItems onCloseDrawer={onCloseDrawer} />
            </Drawer>

            {!isMobile && <SidebarItems onCloseDrawer={onCloseDrawer} />}
        </Box>
    );
}
