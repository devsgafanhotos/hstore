import MyDialog from "../../components/modal/MyDialog";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { FaIdCard, FaMoneyBill } from "react-icons/fa";
import { AttachMoney, Money } from "@mui/icons-material";

import { useCache } from "../../hooks/useCache";
import FormFields from "../../components/form/FormFields";
import AppLoader from "../../components/feedback/AppLoader";
import { useAlert } from "../../hooks/useAlert";

export function DialogNovaFaturacao({}) {
    const { sellState, handleSell } = useCache();
    const onCloseDialog = () => handleSell(false);

    return (
        <MyDialog
            open={sellState.show}
            onClose={onCloseDialog}
            title={"Nova Faturação"}
        >
            <FormNovaFaturacao onCloseDialog={onCloseDialog} />
        </MyDialog>
    );
}

function FormNovaFaturacao({ onCloseDialog }) {
    const { setAlert } = useAlert();
    const [formData, setFormData] = useState({
        valor_fisico: Number,
        valor_eletronico: Number,
        agente_id: Number,
    });

    const handleChange = ({ target }) => {
        setFormData((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const Fields = [
        {
            handleChange: handleChange,
            icon: FaIdCard,
            label: "Agente",
            name: "agente_id",
            required: true,
            type: "number",
            value: formData.agente_id,
        },
        {
            handleChange: handleChange,
            icon: FaMoneyBill,
            label: "Valor Fisico",
            name: "valor_fisico",
            type: "number",
            value: formData.valor_fisico,
        },
        {
            handleChange: handleChange,
            icon: AttachMoney,
            label: "Valor Eletronico",
            name: "valor_eletronico",
            type: "number",
            value: formData.valor_eletronico,
        },
    ];

    const [formStatus, setFormStatus] = useState("typing");
    const isFormValid =
        (formData.agente_id.length >= 4 &&
            (formData.valor_eletronico.length >= 4 ||
                formData.valor_fisico.length >= 4)) ||
        formStatus === "loading";

    const titleButton =
        formStatus === "typing" ? (
            "Registrar"
        ) : (
            <>
                Registrando... <AppLoader type={"small"} />
            </>
        );

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setFormStatus("loading");
            setTimeout(() => {
                onCloseDialog();
                return setAlert({
                    type: "SHOW",
                    text: "Operação conscluída",
                    style: "success",
                });
            }, 1000);

            /*if (response?.success) {
                setFormStatus("done");
                return setAlert({
                    type: "SHOW",
                    text: response.message,
                    style: "success",
                });
            }*/
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

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{ p: 1, paddingBottom: 3 }}
        >
            <FormFields Fields={Fields} />
            <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
                <Button variant="outlined" onClick={onCloseDialog}>
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={!isFormValid}
                >
                    {titleButton}
                </Button>
            </Box>
        </Box>
    );
}
