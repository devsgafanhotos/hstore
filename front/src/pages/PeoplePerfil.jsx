import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import iconMapper from "../utils/iconMapper";
import { useAuth } from "../hooks/useAuth";
import MiniMenu from "../components/modal/MiniMenu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLoader from "../components/feedback/AppLoader";
import { api } from "../api/axios";
import { FaQuestionCircle } from "react-icons/fa";
import MyLinkButton from "../components/form/MyLinkButton";
import MyButton from "../components/form/MyButton";

export default function PeoplePerfil({ type = "Usuarios" }) {
    const { user } = useAuth();
    const { id_usuario, id_agente } = useParams();
    const [peoplePerfil, setPeoplePerfil] = useState(null);
    const [pageState, setPageState] = useState("loading");
    async function getPeople() {
        try {
            const url =
                type === "Usuarios" ? "/user/usuarios" : "/agent/agentes";
            const id = type === "Usuarios" ? id_usuario : id_agente;

            const { data } = await api.get(url, {
                params: { id: id },
            });
            const people = data.data[0];
            if (people) {
                return setPeoplePerfil(data.data[0]);
            } else {
                return setPeoplePerfil(null);
            }
        } catch (error) {
            setPeoplePerfil(null);
        } finally {
            setPageState("done");
        }
    }

    useEffect(() => {
        setPageState("loading");
        if (id_usuario || id_agente) {
            getPeople();
        } else {
            setPeoplePerfil(user);
            setPageState("done");
        }
    }, [type, id_usuario, id_agente]);

    if (pageState === "loading") {
        return (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <p>Carregando ...</p>
                <AppLoader />
            </div>
        );
    }

    let formDelete;

    if (peoplePerfil) {
        formDelete = "Excluir perfil";
    }

    function ListPeople({}) {
        return (
            <List sx={{ padding: 0, margin: 0 }}>
                {Object.keys(peoplePerfil).map((key) => {
                    if (key === "nome") return;
                    
                    const Icon = iconMapper[key];
                    
                    return (
                        <ListItem sx={{ p: 0, marginBottom: "2px" }} key={key}>
                            <ListItemButton sx={{ borderRadius: 2 }}>
                                <ListItemIcon>
                                    <Icon
                                        size={20}
                                        className="text-(--color-secondary)"
                                    />
                                </ListItemIcon>
                                <div className="-ml-5">
                                    <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                                    <ListItemText
                                        sx={{ margin: 0 }}
                                        primary={peoplePerfil[key]}
                                    />
                                </div>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        );
    }

    return (
        <div className="flex-1 " style={{ margin: 0, padding: 0 }}>
            <div className="flex-auto flex relative justify-center mt-2">
                <div className="flex justify-center items-center flex-col">
                    <div className="rounded-full w-30 h-30 flex justify-center items-center text-7xl bg-(--color-primary) text-(--color-gray) mt-2 mb-1">
                        {peoplePerfil?.nome[0] || <FaQuestionCircle />}
                    </div>
                    <Typography variant="h5">{peoplePerfil?.nome}</Typography>
                </div>
                <div className="absolute right-0">
                    <MiniMenu
                        options={[formDelete || "Acção indisponível..."]}
                        sx={{ marginLeft: -3 }}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-3">
                {peoplePerfil ? (
                    <ListPeople />
                ) : (
                    <Typography variant="h5">Perfil inexistente...</Typography>
                )}
                <Actions type={type} />
            </div>
        </div>
    );
}

function Actions({ type }) {
    if (type === "Usuarios") return;
    return (
        <Box
            py={2}
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            gap={2}
        >
            <MyButton to={"/nova"} title={"Nova Faturação"}>
                Nova Faturação
            </MyButton>
            <MyLinkButton to={"/nova"} title={"Relatório Mensal"} />
            <MyLinkButton to={"/nova"} title={"Ver Historico"} />
        </Box>
    );
}
