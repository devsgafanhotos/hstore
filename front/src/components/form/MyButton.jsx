import Button from "@mui/material/Button";
export default function MyButton({
    children,
    variant = "contained",
    type,
    handleClick,
    disabled = false,
    args,
    sx,
}) {
    return (
        <Button
            variant={variant}
            type={type}
            disabled={disabled}
            onClick={handleClick}
            sx={{
                textTransform: "none",
                color: variant === "contained" ? "background.default" :  "primary.main",
                borderColor: variant === "contained" ? "background.default" :  "primary.main",
                backgroundColor: variant === "contained" ? "secondary.main" :  "background.default",
                fontSize: "1rem",
                ...sx,
            }}
            {...args}
        >
            {children}
        </Button>
    );
}
