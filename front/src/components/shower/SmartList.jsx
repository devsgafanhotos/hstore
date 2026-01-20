import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography,
    Card,
    CardContent,
    CardHeader,
    ListItemText,
    IconButton,
    Stack,
    Box,
    Avatar,
    Button,
} from "@mui/material";
import { Plus } from "lucide-react";
import AppLoader from "../feedback/AppLoader";
import { FaQuestion } from "react-icons/fa";

export default function SmartList({
    ListItems = null,
    pageState = "",
    title = "Items",
    handleItemClick,
    FormFilter,
    PlusAction,
    extraButton,
    // eslint-disable-next-line no-unused-vars
    Labels,
}) {
    const CardHeaderTitle = (
        <div className="flex justify-between items-center mr-1">
            {title}
            {PlusAction && (
                <IconButton onClick={PlusAction} sx={{ padding: 0 }}>
                    <Plus color="#F37021" size={30} />
                </IconButton>
            )}
            {extraButton && extraButton}
        </div>
    );

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    gap: 2,
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                >
                    {FormFilter && FormFilter}
                </Stack>
            </Box>

            <Card>
                <CardHeader
                    sx={
                        !title.includes("Faturaçõees Recentes") && {
                            backgroundColor: "primary.main",
                            color: "background.paper",
                        }
                    }
                    title={CardHeaderTitle}
                />
                <CardContent
                    sx={{
                        padding: 0,
                    }}
                >
                    {pageState === "loading" || !ListItems ? (
                        <div className="p-4 flex flex-col justify-center items-center gap-2">
                            <p>Buscando...</p>
                            <AppLoader />
                        </div>
                    ) : (
                        <List sx={{ padding: 0 }}>
                            {ListItems?.length === 0 ? (
                                <ListItem
                                    sx={{ padding: 0, marginBottom: "2px" }}
                                    key={"none"}
                                >
                                    <ListItemButton
                                        sx={{
                                            borderRadius: 2,
                                            padding: 1,
                                            px: { md: 3 },
                                            display: "flex",
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: "primary.main",
                                                color: "white",
                                                mr: 2,
                                                width: 48,
                                                height: 48,
                                                display: {
                                                    xs: "none",
                                                    md: "flex",
                                                },
                                            }}
                                        >
                                            ?
                                        </Avatar>
                                        <ListItemText
                                            primary={`Sem ${title.toLocaleLowerCase()}`}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ) : (
                                ListItems.map((listItem, index) => (
                                    <MyListItem
                                        key={listItem?.id}
                                        listItem={listItem}
                                        handleClick={handleItemClick}
                                        index={index}
                                        title={title}
                                    />
                                ))
                            )}
                        </List>
                    )}
                </CardContent>
            </Card>
        </>
    );
}

export function MyListItem({ listItem, handleClick, index, title }) {
    return (
        <>
            <ListItem
                onClick={() => handleClick?.(listItem)}
                sx={{ padding: 0.5, my: 0.5 }}
            >
                <ListItemButton
                    sx={{
                        borderRadius: 2,
                        padding: 1,
                        px: { md: 4 },
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div className="flex items-center">
                        <Avatar
                            sx={{
                                bgcolor:
                                    index % 2 === 0
                                        ? "primary.main"
                                        : "secondary.main",
                                color: "white",
                                mr: 4,
                                width: 48,
                                height: 48,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {listItem?.nome?.split(" ")[0][0] ||
                                listItem?.agente?.split(" ")[0][0]}
                        </Avatar>
                        <div className="flex flex-col">
                            <Typography
                                variant="h6"
                                fontSize={"1.2rem"}
                                color="text.primary"
                                fontWeight={"bold"}
                                noWrap
                            >
                                {listItem?.agente || listItem?.nome}
                            </Typography>
                            <Typography
                                variant="caption"
                                fontSize={"1rem"}
                                color="text.secondary"
                                display="flex"
                                alignItems="center"
                                gap={0.5}
                            >
                                {listItem?.parcela
                                    ? new Date(
                                          listItem?.data,
                                      ).toLocaleDateString()
                                    : new Date(listItem?.data).toLocaleString()}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                fontSize={"1rem"}
                                textAlign={"left"}
                            >
                                <p className="text-center md:hidden">
                                    {listItem?.parcela} Parcela{" "}
                                </p>
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            fontSize={"1rem"}
                            textAlign={"right"}
                        >
                            {listItem?.tipoFaturacao}
                            {listItem?.telefone && `+244 ${listItem?.telefone}`}
                            {listItem?.parcela && (
                                <p className="text-center hidden md:block">
                                    <p>{listItem?.parcela}</p> Parcela{" "}
                                </p>
                            )}
                        </Typography>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize={"1.3rem"}
                            color={
                                listItem?.valor
                                    ? "var(--color-green)"
                                    : "secondary.main"
                            }
                            textAlign={"right"}
                        >
                            {listItem?.valor && !listItem?.parcela
                                ? getMoeda(listItem?.valor)
                                : listItem?.id}
                        </Typography>
                    </div>
                    {listItem?.parcela && (
                        <div className="flex flex-col items-end">
                            <Typography
                                variant="body1"
                                fontWeight={600}
                                fontSize={"1.3rem"}
                                color={
                                    listItem?.valor
                                        ? "var(--color-green)"
                                        : "secondary.main"
                                }
                                textAlign={"right"}
                            >
                                {getMoeda(listItem?.bonus)}
                            </Typography>
                            {title?.includes("Pendentes") && (
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "secondary.main",
                                        width: "30px",
                                    }}
                                    onClick={() => handleClick?.(listItem)}
                                >
                                    Marcar
                                </Button>
                            )}
                        </div>
                    )}
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function getMoeda(valor = 0) {
    return valor.toLocaleString("pt-AO", {
        style: "currency",
        currency: "AOA",
    });
}
