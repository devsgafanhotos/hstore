import { Box, Typography } from "@mui/material";

export default function Logo({ title = "H-STORE" }) {
    return (
        <Typography
            noWrap
            variant="h5"
            sx={{
                fontWeight: 900,
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
        >
            {title}
            <Box
                component="span"
                sx={{
                    width: 8,
                    height: 8,
                    mt: 0.3,
                    bgcolor: "secondary.main",
                    borderRadius: "20px",
                }}
            />
        </Typography>
    );
}
