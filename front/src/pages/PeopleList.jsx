import {
    Card,
    Container,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import iconMapper from "../utils/iconMapper";
import { FaPlus, FaUserAltSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { api } from "../api/axios";

export default function PeopleList({ type = "Usuarios" }) {
    const [people, setPeople] = useState(null);
    async function getPeople() {
        try {
            const url =
                type === "Usuarios" ? "/user/usuarios" : "/agent/agentes";
            const { data } = await api.get(url);
            return setPeople(data.data);
        } catch (error) {
            setPeople([]);
        }
    }

    useEffect(() => {
        getPeople();
    }, [type]);

    return (
        <div className="flex-1 md:p-5">
            <Card elevation={3} sx={{ borderRadius: "9px" }}>
                <CardHeader sx={"flex justify-between items-center  "}>
                    <p>{type} cadastrados</p>
                    <Link
                        to={`/${type}/cadastrar`}
                        className="bg-(--color-primary) p-1 rounded-full"
                    >
                        <FaPlus className="text-(--color-gray)" />
                    </Link>
                </CardHeader>
                <Container sx={{ paddingBottom: 3 }}>
                    <List>
                        {!people || people.length === 0 ? (
                            <ListItem
                                sx={{ p: 0, marginBottom: "2px" }}
                                key={"none"}
                            >
                                <ListItemButton sx={{ borderRadius: 2 }}>
                                    <ListItemIcon>
                                        <FaUserAltSlash
                                            size={20}
                                            className="text-(--color-secondary)"
                                        />
                                    </ListItemIcon>
                                    <div className="-ml-5">
                                        <p>Sem entidades cadastradas</p>
                                    </div>
                                </ListItemButton>
                            </ListItem>
                        ) : (
                            people.map((people) => (
                                <PeopleListItem people={people} type={type} />
                            ))
                        )}
                    </List>
                </Container>
            </Card>
        </div>
    );
}

export function CardHeader({ children, sx }) {
    return (
        <div className={`p-4 pr-6 pl-4 bg-(--color-secondary) text-white text-xl ${sx}`}>
            {children}
        </div>
    );
}

export function PeopleListItem({ people, type = "Usuarios" }) {
    const Icon =
        type === "Usuarios" ? iconMapper.usuariosCadastrados : iconMapper.nome;
    const to =
        type === "Usuarios"
            ? `/perfil/${people.id}`
            : `/subagente/${people.id}`;

    return (
        <Link to={to} key={type}>
            <ListItem sx={{ p: 0, marginBottom: "2px" }} key={people.id}>
                <>
                    <ListItemButton
                        sx={{
                            borderRadius: 2,
                            paddingLeft: { xs: 0 },
                            paddingRight: { xs: 0 },
                        }}
                    >
                        <ListItemIcon>
                            <Icon
                                size={20}
                                className="text-(--color-secondary)"
                            />
                        </ListItemIcon>
                        <div className="-ml-6 w-full flex justify-between p-2">
                            <ListItemText
                                sx={{ margin: 0 }}
                                primary={people.nome}
                            />
                            <ListItemText
                                sx={{
                                    margin: 0,
                                    textAlign: "right",
                                    color: "var(--color-primary)",
                                    fontWeight: "bold",
                                }}
                                primary={people.id}
                            />
                        </div>
                    </ListItemButton>
                </>
            </ListItem>
            <Divider />
        </Link>
    );
}
