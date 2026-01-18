import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../../pages/Login";
import Logout from "../../pages/Logout";
import Faturacoes from "../../pages/Faturacoes/Faturacoes";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Agentes from "../../pages/Agentes/Agentes";
import Usuarios from "../../pages/Usuarios/Usuarios";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Agente from "../../pages/Agentes/Agente";
import Usuario from "../../pages/Usuarios/Usuario";
import { useAuth } from "../../hooks/useAuth";
import Profile from "../../components/shower/Profile.jsx";

export default function AppRouter() {
    const { user } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/relatorios" element={<>/relatorios</>} />
                        <Route path="/pagamentos" element={<>/pagamentos</>} />
                        <Route path="/faturacoes" element={<Faturacoes />} />

                        <Route path="/subagentes" element={<Agentes />} />
                        <Route
                            path="/subagente/:id_agente"
                            element={<Agente />}
                        />

                        <Route path="/usuarios" element={<Usuarios />} />
                        <Route
                            path="/usuario/:id_usuario"
                            element={<Usuario />}
                        />
                        <Route path="/perfil" element={<Profile ItemProfile={user} />} />
                        <Route path="/logout" element={<Logout />} />

                        <Route path="*" element={<h1>Not Found</h1>} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
