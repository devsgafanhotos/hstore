import { Card, Container } from "@mui/material";

export default function MyCard({ children, sx }) {
    return (
        <Card elevation={3} sx={{ borderRadius: "9px", ...sx }}>
            {children}
        </Card>
    );
}

export function MyCardContent({ children, sx }) {
    return (
        <Container sx={{...sx}}>
            {children}
        </Container>
    );
}

export function MyCardHeader({ children, sx }) {
    return (
        <div
            className={`p-4 pr-6 pl-4 bg-(--color-secondary) text-white text-xl ${sx}`}
        >
            {children}
        </div>
    );
}
