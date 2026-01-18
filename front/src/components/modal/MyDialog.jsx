import {
    Dialog,
    DialogContent,
    Drawer,
    Box,
    Divider,
    Typography,
    useMediaQuery,
} from "@mui/material";
import theme from "../../theme";

export default function MyDialog({
    open,
    onClose,
    title = "Título",
    children,
    minHeight = "1vh",
}) {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    function MyDialogTitle() {
        return (
            <>
                <Box
                    sx={{
                        width: 50,
                        height: 5,
                        bgcolor: "grey.400",
                        borderRadius: 2,
                        mx: "auto",
                        mb: 1,
                    }}
                />
                <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
                    {title}
                </Typography>
            </>
        );
    }

    function MyDialogContent() {
        return (
            <>
                <Box sx={{ overflowY: "auto", maxHeight: "100%" }}>
                    {children}
                </Box>
            </>
        );
    }

    return (
        <>
            <Dialog
                open={open && !isMobile}
                onClose={onClose}
                fullWidth
                maxWidth="xs"
            >
                <Box sx={{ p: 2 }}>
                    <MyDialogTitle />
                    <Divider sx={{ mb: 2 }} />
                    <MyDialogContent />
                </Box>
            </Dialog>

            <Drawer
                anchor="bottom"
                open={open && isMobile}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        minHeight,
                        maxHeight: "95vh",
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <MyDialogTitle />
                    <Divider sx={{ mb: 2 }} />
                    <MyDialogContent />
                </Box>
            </Drawer>
        </>
    );
}
