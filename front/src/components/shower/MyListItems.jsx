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
} from "@mui/material";
import AppLoader from "../feedback/AppLoader";
import { Link } from "react-router-dom";
import { FaPlus, FaQuestion } from "react-icons/fa";

export default function MyListItems({
    ListItems = [],
    ItemIcone = FaQuestion,
    pageState = "",
    title = "Items",
    extraButton,
    buttonPluss = { to: null, handleClick: null },
    handleItemClick,
}) {
    const CardHeaderTitle = (
        <div className="flex justify-between items-center">
            {title}
            {extraButton}
            {(buttonPluss.to || buttonPluss.handleClick) && (
                <>
                    {buttonPluss.to ? (
                        <Link to={buttonPluss.to}>
                            <FaPlus color="#F37021" />
                        </Link>
                    ) : (
                        <IconButton onClick={buttonPluss.handleClick}>
                            <FaPlus color="#F37021" />
                        </IconButton>
                    )}
                </>
            )}
        </div>
    );

    return (
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
                {pageState === "loading" ? (
                    <div className="p-4 flex flex-col justify-center items-center gap-2">
                        <p>Buscando...</p>
                        <AppLoader />
                    </div>
                ) : (
                    <List sx={{ padding: 0 }}>
                        {!ListItems || ListItems.length === 0 ? (
                            <ListItem
                                sx={{ padding: 0, marginBottom: "2px" }}
                                key={"none"}
                            >
                                <ListItemButton sx={{ borderRadius: 2 }}>
                                    <ListItemIcon>
                                        <ItemIcone
                                            size={20}
                                            className="text-(--color-secondary)"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Sem ${title.toLocaleLowerCase()}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ) : (
                            ListItems.map((listItem) => (
                                <MyListItem
                                    listItem={listItem}
                                    handleClick={handleItemClick}
                                />
                            ))
                        )}
                    </List>
                )}
            </CardContent>
        </Card>
    );
}

export function MyListItem({ listItem, Icon, handleClick }) {
    return (
        <>
            <ListItem
                onClick={() => handleClick(listItem.id)}
                sx={{ padding: 0.5, my: 0.5 }}
                key={listItem?.id}
            >
                <ListItemButton
                    sx={{
                        borderRadius: 2,
                        padding: 1,
                        px: { md: 2 },
                        display: "flex",
                    }}
                >
                    <div className="flex-1 flex flex-col">
                        <Typography
                            variant="h6"
                            fontSize={"1.2rem"}
                            color="text.primary"
                            fontWeight={"bold"}
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
                            {new Date(
                                listItem?.dataFaturacao ||
                                    listItem?.dataCadastro
                            ).toLocaleString() ?? "DD/MM/AAA, hh:ss:ms"}{" "}
                        </Typography>
                    </div>
                    <div className="flex flex-col">
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            fontSize={"1rem"}
                            textAlign={"right"}
                        >
                            {listItem?.tipoFaturacao ||
                                `+244 ${listItem?.telefone}`}
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
                            {getMoeda(listItem?.valor) || listItem?.id}
                        </Typography>
                    </div>
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
    );
}

export function getMoeda(valor) {
    if (!valor) {
        return null;
    }
    return valor.toLocaleString("pt-AO", {
        style: "currency",
        currency: "AOA",
    });
}
