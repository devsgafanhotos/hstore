import { Search } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

export default function SearchField({
    filterValue,
    setFilterValue,
    placeholder = "Filtrar Por: Nome || Telefone || ID",
}) {
    return (
        <Box paddingBottom={1.5}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <IconButton
                    sx={{
                        padding: 0.7,
                        borderRight: "1px solid",
                        borderColor: "divider",
                        borderRadius: 0,
                        borderTopLeftRadius: "25px",
                        borderBottomLeftRadius: "25px",
                        backgroundColor: "background.paper",
                    }}
                >
                    <Search size={10} sx={{ color: "secondary.main" }} />
                </IconButton>
                <input
                    style={{
                        padding: 8,
                        fontSize: ".8rem",
                    }}
                    className="outline-0 rounded-tr-full rounded-br-full bg-(--color-bg) min-w-60"
                    placeholder={placeholder}
                    value={filterValue}
                    onChange={(e) => {
                        setFilterValue(e.target.value);
                    }}
                />
            </Box>
        </Box>
    );
}