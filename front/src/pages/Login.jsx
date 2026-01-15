import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Fade,
    Typography,
} from "@mui/material";
import { ArrowForward, LockOutlined, Phone } from "@mui/icons-material";
import { useState } from "react";
import AppLoader from "../components/feedback/AppLoader";
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import FormFields from "../components/form/FormFields";

export default function Login({}) {
    const { login, user } = useAuth();
    const { setAlert } = useAlert();

    const [credentials, setCredentials] = useState({
        telefone: "",
        senha: "",
    });
    const [formStatus, setFormStatus] = useState("typing");
    const isFormValid =
        !(credentials.telefone.length >= 9) ||
        !(credentials.senha.length >= 6) ||
        formStatus === "loading";

    const handleChange = ({ target }) => {
        setCredentials((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const Fields = [
        {
            label: "Telefone",
            name: "telefone",
            type: "tel",
            value: credentials.telefone,
            icon: Phone,
            handleChange: handleChange,
            required: true,
        },
        {
            label: "Senha",
            name: "senha",
            type: "password",
            value: credentials.senha,
            icon: LockOutlined,
            handleChange: handleChange,
            required: true,
        },
    ];

    const titleButton =
        formStatus === "typing" ? (
            "Entrar"
        ) : (
            <>
                Entrando... <AppLoader type={"small"} />
            </>
        );

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setFormStatus("loading");
            const response = await login(credentials);

            if (response?.success) {
                setFormStatus("done");
                return setAlert({
                    type: "SHOW",
                    text: response.message,
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

            setFormStatus("typing");
        }
    };

    if (user || formStatus === "done") {
        return <Navigate to={"/"} />;
    }

    return (
        <Box
            flex={"1"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            component={"form"}
            onSubmit={handleSubmit}
        >
            <Fade in timeout={600}>
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 450,
                        borderRadius: "24px",
                        boxShadow: "0 20px 40px rgba(0,0,0,.1)",
                    }}
                >
                    <CardHeader title="Bem-vindo" />
                    <CardContent
                        sx={{ p: 3, pt: 3, pb: 5, display: "grid", gap: 3 }}
                    >
                        <FormFields Fields={Fields} />
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            disabled={isFormValid}
                            sx={{ py: 1.4 }}
                            endIcon={!isFormValid && <ArrowForward />}
                        >
                            {titleButton}
                        </Button>
                    </CardContent>
                </Card>
            </Fade>
        </Box>
    );
}
