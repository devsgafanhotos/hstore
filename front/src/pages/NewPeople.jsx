import { useState } from "react";
import AppLoader from "../components/feedback/AppLoader";
import MyButton from "../components/form/MyButton";
import { useAlert } from "../hooks/useAlert";
import MyInput from "../components/form/MyInput";
import { Navigate } from "react-router-dom";
import { api } from "../api/axios";
import { Box, Card, CardContent, CardHeader } from "@mui/material";

const OptionsInitialPeople = {
    Usuarios: {
        email: "",
        telefone: "",
        nome: "",
        role: "",
    },
    Subagentes: {
        id_agente: "",
        telefone: "",
        nome: "",
    },
};

const typeMapper = {
    nome: "text",
    telefone: "tel",
    email: "email",
    role: "text",
    id_agente: "number",
};

export default function NewPeople({ type = "Usuarios" }) {
    const { setAlert } = useAlert();
    const initialPeople = OptionsInitialPeople[type];
    const [newPeople, setNewPeople] = useState(initialPeople);
    const [peopleId, setPeopleId] = useState(null);
    const [formState, setFormState] = useState("typing");

    const formDisabled =
        type === "Usuarios"
            ? !newPeople.nome ||
              !newPeople.telefone ||
              !newPeople.email ||
              formState === "loading"
            : !newPeople.id_agente ||
              !newPeople.telefone ||
              !newPeople.nome ||
              formState === "loading";

    const titleButton =
        formState === "typing" ? (
            "Cadastrar"
        ) : (
            <>
                Cadastrando... <AppLoader type={"small"} />
            </>
        );

    const handleChangeInput = (e) => {
        setNewPeople({
            ...newPeople,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setFormState("loading");

            const url =
                type === "Usuarios" ? "/user/cadastrar" : "/agent/cadastrar";
            const { data } = await api.post(url, newPeople);

            if (data?.success) {
                setPeopleId(data.data.id);
                setFormState("done");
                return setAlert({
                    type: "SHOW",
                    text: data.message,
                    style: "success",
                });
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setAlert({
                    type: "SHOW",
                    text: error.message,
                    style: "error",
                });
            } else {
                setAlert({
                    type: "SHOW",
                    text: error.response?.data?.message,
                    style: "warning",
                });
            }

            setFormState("typing");
        }
    };

    if (peopleId || formState === "done") {
        const to =
            type === "Usuarios"
                ? `/perfil/${peopleId}`
                : `/subagente/${peopleId}`;
        return <Navigate to={to} />;
    }
    return (
        <Box
            flex={"1"}
            margin={"auto"}
            display={"flex"}
            alignItems={"center"}
            component={"form"}
            onSubmit={handleSubmit}
        >
            <Card sx={{ width: { xs: 320, sm: 450 }, borderRadius: "9px" }}>
                <CardHeader title={`Cadastrar ${type.slice(0, -1)}`}/>
                <CardContent
                    sx={{ p: 3, pt: 3, pb: 5, display: "grid", gap: 3 }}
                >
                    {Object.keys(initialPeople).map((key) => {
                        return (
                            <MyInput
                                id={key}
                                label={
                                    key[0].charAt(0).toUpperCase() +
                                    key.slice(1)
                                }
                                type={typeMapper[key]}
                                name={key}
                                handleChangeInput={(e) => {
                                    handleChangeInput(e);
                                }}
                            />
                        );
                    })}

                    <MyButton
                        sx={{ borderRadius: 5 }}
                        disabled={formDisabled}
                        type={"submit"}
                    >
                        {titleButton}
                    </MyButton>
                </CardContent>
            </Card>
        </Box>
    );
}
