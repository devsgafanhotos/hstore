import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { FaQuestionCircle } from "react-icons/fa";

import iconMapper from "../../utils/iconMapper";
import MiniMenu from "../../components/modal/MiniMenu";

export default function Profile({ ItemProfile }) {
    function CardItemProfile() {
        return (
            <List sx={{ padding: 0, margin: 0 }}>
                {Object.keys(ItemProfile).map((key) => {
                    if (key === "nome") return;
                    const Icon = iconMapper[key];

                    return (
                        <ListItem sx={{ p: 0, marginBottom: "2px" }} key={key}>
                            <ListItemButton
                                sx={{ borderRadius: 2, p: 2.5, py: 1, mb: 0.5 }}
                            >
                                <ListItemIcon color="secondary.main">
                                    <Icon
                                        size={20}
                                        color="#F37021"
                                        sx={{ color: "#F37021" }}
                                    />
                                </ListItemIcon>
                                <div className="-ml-5">
                                    <p>
                                        {key.charAt(0).toUpperCase() +
                                            key.slice(1)}
                                    </p>
                                    <ListItemText
                                        sx={{ margin: 0 }}
                                        primary={ItemProfile[key]}
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
        <Box>
            <div className="flex-auto flex relative justify-center mt-1">
                <div className="flex justify-center items-center flex-col gap-1">
                    <Avatar
                        sx={{
                            backgroundColor: "secondary.main",
                            p: 7.5,
                            fontSize: 80,
                        }}
                    >
                        {ItemProfile?.nome[0] || <>?</>}
                    </Avatar>
                    <Typography variant="h5" fontWeight={600}>
                        {ItemProfile?.nome}
                    </Typography>
                </div>
                <div className="absolute right-0">
                    <MiniMenu options={["Acções"]} sx={{ marginLeft: -3 }} />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-3">
                {ItemProfile ? (
                    // eslint-disable-next-line react-hooks/static-components
                    <CardItemProfile />
                ) : (
                    <Typography variant="h5">Perfil inexistente...</Typography>
                )}
            </div>
        </Box>
    );
}
