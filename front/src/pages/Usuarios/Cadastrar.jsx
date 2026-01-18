import { Mail, People, Phone } from "@mui/icons-material";
import FormFields from "../../components/form/FormFields";
import { useState } from "react";
import { Alert, Box, Button } from "@mui/material";
import { api } from "../../api/axios";
import { useAlert } from "../../hooks/useAlert";
import { useCache } from "../../hooks/useCache";
import AppLoader from "../../components/feedback/AppLoader";

export default function FormCadastrarUsuario({ onCLoseDialog }) {
    const { setAlert } = useAlert();
    const { ReloadCache } = useCache();

    const [formStatus, setFormStatus] = useState("typing");
    const [formInfo, setFormInfo] = useState("");
    const [novoUsuario, setNovoUsuario] = useState({
        email: "",
        telefone: "",
        nome: "",
        role: "Normal",
    });

    const handleChange = ({ target }) => {
        setNovoUsuario((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setFormStatus("loading");

            const { data } = await api.post("/user/cadastrar", novoUsuario);

            if (data?.success) {
                ReloadCache("users");
                onCLoseDialog();
                setFormStatus("done");

                return setAlert({
                    type: "SHOW",
                    text: data.message,
                    style: "success",
                });
            }
        } catch (error) {
            console.log(error);

            setFormInfo(error.response?.data?.message || error.message);
            setFormStatus("warning");
        }
    };

    const isFormValid =
        novoUsuario.nome.length >= 4 &&
        (novoUsuario.email.length >= 4 || novoUsuario.telefone.length >= 9);

    const titleButton =
        formStatus !== "loading" ? (
            "Registrar"
        ) : (
            <>
                Registrando... <AppLoader type={"small"} />
            </>
        );

    const Fields = [
        {
            handleChange: handleChange,
            icon: Mail,
            label: "E-mail",
            name: "email",
            type: "tel",
            value: novoUsuario.email,
        },
        {
            handleChange: handleChange,
            icon: Phone,
            label: "Telefone",
            name: "telefone",
            type: "tel",
            value: novoUsuario.telefone,
        },
        {
            handleChange: handleChange,
            icon: People,
            label: "Nome",
            name: "nome",
            type: "text",
            value: novoUsuario.nome,
        },
    ];

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{ p: 1, paddingBottom: 3 }}
        >
            {formStatus === "warning" && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {formInfo}
                </Alert>
            )}
            <FormFields Fields={Fields} />
            <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
                <Button variant="outlined" onClick={onCLoseDialog}>
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={!isFormValid || formStatus === "loading"}
                >
                    {titleButton}
                </Button>
            </Box>
        </Box>
    );
}
