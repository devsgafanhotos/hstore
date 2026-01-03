import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearDeterminate() {
    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={50} />
        </Box>
    );
}