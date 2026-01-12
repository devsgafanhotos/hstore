import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
} from "@mui/material";

import { useAuth } from "../../hooks/useAuth";
import { optionsMenu } from "../../utils/optionsMenu";
import iconMapper from "../../utils/iconMapper";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function OpcoesMenu({ toggleDrawer }) {
    const { user } = useAuth();

    const menuOptions = user ? optionsMenu.user : optionsMenu.public;
    const profileOptions = optionsMenu.profile;

    const handleClose = () => {
        toggleDrawer(false);
    };
    const ProfileIcon = iconMapper.meuPerfil;

    function MenuOption({ option, onClose }) {
        const Icon = iconMapper[option.icone];

        return (
            <MyListItem onClose={onClose}>
                <ListItemButton>
                    <ListItemIcon>
                        <Icon size={20} className="text-gray-900" />
                    </ListItemIcon>

                    <Link to={option.link} className="-ml-5 w-full">
                        <p className="text-gray-900 w-full pt-1.5 pb-1.5">
                            {option.titulo}
                        </p>
                    </Link>
                </ListItemButton>
            </MyListItem>
        );
    }

    function MyListItem({ children, onClose }) {
        return (
            <ListItem onClick={onClose} sx={{ padding: "0" }}>
                {children}
            </ListItem>
        );
    }

    return (
        <Box sx={{ width: 270 }} role="presentation" className="h-screen">
            <List
                sx={{
                    display: "flex",
                    flexFlow: "column",
                    backgroundColor: "secondary.main",
                    justifyContent: "space-between",
                    height: "100%",
                    p: 0,
                    color: "text.main"
                }}
            >
                <div>
                    <Box
                        sx={{
                            backgroundColor: "primary.main",
                            color: "secondary.main",
                            height: 170,
                            px: 2,
                            display: "flex",
                            flexFlow: "column",
                            justifyContent: "center"
                        }}
                    >
                        <Link to={"/"} onClick={handleClose}>
                            <h1 className="text-5xl font-extrabold">H-STORE</h1>
                            <Box
                            component="span"
                            sx={{
                                width: 8,
                                height: 8,
                                bgcolor: "secondary.main",
                                borderRadius: "50%",
                            }}
                        />
                            <p className="text-xl">Agente autorizado Unitel</p>
                        </Link>
                    </Box>
                    {menuOptions.map((option) => (
                        <MenuOption
                            key={option.descricao}
                            option={option}
                            onClose={handleClose}
                        />
                    ))}
                </div>

                {user && (
                    <div>
                        <Divider sx={{ marginTop: 0 }} />
                        <MyListItem>
                            <Accordion sx={{ padding: 0, boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="profile-panel"
                                    id="profile-header"
                                    sx={{
                                        padding: 0,
                                        width: 268,
                                        backgroundColor: "var(--color-primary)",
                                    }}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ProfileIcon
                                                className="text-black"
                                                size={20}
                                            />
                                        </ListItemIcon>

                                        <p className="-ml-5 font-extralight w-full">
                                            {user?.nome || "Perfil"}
                                        </p>
                                    </ListItemButton>
                                </AccordionSummary>

                                <AccordionDetails
                                    sx={{
                                        p: 0,
                                        backgroundColor: "var(--color-primary)",
                                    }}
                                >
                                    <div className="ml-3 -mt-3">
                                        {profileOptions.map((option) => (
                                            <MenuOption
                                                key={option.descricao}
                                                option={option}
                                                onClose={handleClose}
                                            />
                                        ))}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </MyListItem>
                    </div>
                )}
            </List>
        </Box>
    );
}
