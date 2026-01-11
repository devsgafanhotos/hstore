import { Card, Container, Typography } from "@mui/material";
import { useState } from "react";
import AppLoader from "../components/feedback/AppLoader";
import MyButton from "../components/form/MyButton";
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";
import MyInput from "../components/form/MyInput";
import { Navigate } from "react-router-dom";
import MyCard, { MyCardContent, MyCardHeader } from "../components/card/Card";

export default function Login({}) {
    const { login, user } = useAuth();
    const { setAlert } = useAlert();

    const [credencials, setCredencials] = useState({
        telefone: "",
        senha: "",
    });
    const [formState, setFormState] = useState("typing");
    const formDisabled =
        !credencials.telefone || !credencials.senha || formState === "loading";
    const titleButton =
        formState === "typing" ? (
            "Entrar"
        ) : (
            <>
                Entrando... <AppLoader type={"small"} />
            </>
        );

    const handleChangeInput = (e) => {
        setCredencials({
            ...credencials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setFormState("loading");
            const response = await login(credencials);

            if (response?.success) {
                setFormState("done");
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

            setFormState("typing");
        }
    };

    if (user || formState === "done") {
        return <Navigate to={"/"} />;
    }
    return (
        <form
            className="flex-1 flex justify-center items-center"
            onSubmit={handleSubmit}
        >
            <MyCard sx={{ width: { xs: 320, sm: 450 } }}>
                <MyCardHeader>
                    <p>Login</p>
                </MyCardHeader>
                <MyCardContent sx={{ p: 3, pt: 3, pb: 5, display: "grid", gap: 3 }}>
                    <MyInput
                        id="telefone"
                        label="Telefone"
                        type="tel"
                        name="telefone"
                        value={credencials.telefone}
                        handleChangeInput={(e) => {
                            handleChangeInput(e);
                        }}
                    />
                    <MyInput
                        id="senha"
                        label="Senha"
                        type="password"
                        name="senha"
                        value={credencials.senha}
                        handleChangeInput={(e) => {
                            handleChangeInput(e);
                        }}
                    />

                    <MyButton sx={{ borderRadius: 5 }} disabled={formDisabled} type={"submit"}>
                        {titleButton}
                    </MyButton>
                </MyCardContent>
            </MyCard>
        </form>
    );
}
