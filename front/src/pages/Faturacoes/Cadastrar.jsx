import { Alert, Autocomplete, Box, Button } from "@mui/material";
import { useState } from "react";
import { FaIdCard, FaMoneyBill } from "react-icons/fa";
import { AttachMoney, CheckCircle } from "@mui/icons-material";

import MyDialog from "../../components/modal/MyDialog";
import { useAction } from "../../hooks/useAction";
import FormFields from "../../components/form/FormFields";
import AppLoader from "../../components/feedback/AppLoader";
import { api } from "../../api/axios";
import { useCache } from "../../hooks/useCache";
import { useAlert } from "../../hooks/useAlert";
import StyledInput from "../../components/form/StyledInput";

export function DialogNovaFaturacao() {
    const { sellState, handleSell } = useAction();
    const onCloseDialog = () => handleSell(false);

    return (
        <MyDialog
            open={sellState}
            onClose={onCloseDialog}
            title={"Nova Faturação"}
        >
            <FormNovaFaturacao onCloseDialog={onCloseDialog} />
        </MyDialog>
    );
}

function FormNovaFaturacao({ onCloseDialog }) {
    const { setAlert } = useAlert();
    const { ReloadCache, entidades } = useCache();
    const { agents = [] } = entidades;

    const [formData, setFormData] = useState({
        valor_fisico: Number,
        valor_electronico: Number,
        forma_pagamento: "",
        nome_agente: "",
    });
    const [formasPagamento, setFormaPagamento] = useState([])

    const getFormaPagamento = async (nome_agente) => {
        try {
            if(!nome_agente) {
                return;
            }
            const { data } = await api.get("/fat/forma_pagamento", {
                params: { nome_agente: nome_agente },
            });
            if(data?.data?.formaPagamento) {
                setFormaPagamento([data.data.formaPagamento]);
                setFormData((prev) => ({
                    ...prev,
                    ["forma_pagamento"]: data.data.formaPagamento,
                }));
            } else {
                setFormaPagamento(["Mensal", "Quinzenal"])
            }
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const handleChange = ({ target }) => {
        setFormData((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const Fields = [
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
            name: "valor_electronico",
            type: "number",
            value: formData.valor_electronico,
        },
    ];

    const [formStatus, setFormStatus] = useState("typing");
    const [formInfo, setFormInfo] = useState("");
    const isFormValid =
        formData.nome_agente.length >= 4 &&
        (formData.valor_electronico.length >= 4 ||
            formData.valor_fisico.length >= 4);

    const titleButton =
        formStatus !== "loading" ? (
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

            const { data } = await api.post("/fat/cadastrar", formData);

            if (data?.success) {
                ReloadCache("faturacoes");
                onCloseDialog();
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

            <FormFields Fields={Fields}>
                <Autocomplete
                    options={agents.map((user) => user.nome)}
                    value={formData.nome_agente}
                    onChange={(_, v) => {
                        getFormaPagamento(v)
                        return setFormData((prev) => ({
                            ...prev,
                            nome_agente: v ?? "",
                        }));
                    }}
                    renderInput={(params) => (
                        <StyledInput
                            {...params}
                            required={true}
                            label="Agente"
                        />
                    )}
                />
                <Autocomplete
                    options={[...formasPagamento]}
                    value={formData.forma_pagamento}
                    onChange={(_, v) => {
                        return setFormData((prev) => ({
                            ...prev,
                            forma_pagamento: v ?? "",
                        }));
                    }}
                    renderInput={(params) => (
                        <StyledInput
                            {...params}
                            required={true}
                            label="Forma de Pagamento"
                        />
                    )}
                />
            </FormFields>

            <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
                <Button variant="outlined" onClick={onCloseDialog}>
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
