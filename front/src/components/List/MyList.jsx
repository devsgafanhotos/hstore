import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography,
} from "@mui/material";
import AppLoader from "../feedback/AppLoader";
import MyCard, { MyCardContent, MyCardHeader } from "../card/Card";
import { Link } from "react-router-dom";
import { FaPlus, FaQuestion } from "react-icons/fa";

export default function MyList({
    ListItems = [],
    ItemIcone = FaQuestion,
    pageState = "",
    title = "Items",
    buttonPluss = { to: null },
    handleItemClick
}) {
    return (
        <MyCard>
            <MyCardHeader sx={"flex justify-between items-center"}>
                <p>{title}</p>
                {buttonPluss.to && (
                    <Link
                        to={buttonPluss.to}
                        className="bg-(--color-primary) p-1 rounded-full"
                    >
                        <FaPlus className="text-(--color-gray)" />
                    </Link>
                )}
            </MyCardHeader>
            <MyCardContent
                sx={{
                    paddingBottom: 3,
                    maxHeight: { xs: "470px", md: "480px" },
                    overflowY: "scroll",
                    px: 0,
                }}
            >
                {pageState === "loading" ? (
                    <div className="p-4 flex flex-col justify-center items-center gap-2">
                        <p>Buscando...</p>
                        <AppLoader />
                    </div>
                ) : (
                    <List>
                        {!ListItems || ListItems.length === 0 ? (
                            <ListItem
                                sx={{ p: 0, marginBottom: "2px" }}
                                key={"none"}
                            >
                                <ListItemButton sx={{ borderRadius: 2 }}>
                                    <ListItemIcon>
                                        <ItemIcone
                                            size={20}
                                            className="text-(--color-secondary)"
                                        />
                                    </ListItemIcon>
                                    <div className="-ml-5">
                                        <p>Sem {title.toLocaleLowerCase()}</p>
                                    </div>
                                </ListItemButton>
                            </ListItem>
                        ) : (
                            ListItems.map((listItem) => (
                                <MyListItem listItem={listItem} handleClick={handleItemClick} />
                            ))
                        )}
                    </List>
                )}
            </MyCardContent>
        </MyCard>
    );
}

export function MyListItem({ listItem, Icon, handleClick }) {
    return (
        <>
            <ListItem onClick={() => handleClick(listItem.id)} sx={{ padding: 0, my: 1 }} key={listItem?.id}>
                <ListItemButton
                    sx={{
                        borderRadius: 2,
                        padding: 1,
                        display: "flex",
                    }}
                >
                    <div className="flex-1 flex flex-col">
                        <Typography
                            variant="h6"
                            fontSize={"1rem"}
                            color="var(--color-text)"
                            fontWeight={"bold"}
                        >
                            {listItem?.agente || listItem?.nome}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                        >
                            {/*<AccessTime sx={{ fontSize: 16 }} />*/}
                            {new Date(
                                listItem?.dataFaturacao ||
                                    listItem?.dataCadastro
                            ).toLocaleString() ?? "DD/MM/AAA, hh:ss:ms"}{" "}
                        </Typography>
                    </div>
                    <div className="flex flex-col">
                        <Typography
                            variant="body1"
                            fontSize={"1.3rem"}
                            color={
                                listItem?.valor
                                    ? "var(--color-green)"
                                    : "var(--color-primary)"
                            }
                            textAlign={"right"}
                        >
                            {getMoeda(listItem?.valor) || listItem?.id}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            fontSize={"1rem"}
                            textAlign={"right"}
                        >
                            {listItem?.tipoFaturacao ||
                                `+244 ${listItem?.telefone}`}
                        </Typography>
                    </div>
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
    );
}

function getMoeda(valor) {
    if (!valor) {
        return null;
    }
    return valor.toLocaleString("pt-AO", {
        style: "currency",
        currency: "AOA",
    });
}
