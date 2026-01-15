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

export default function AppRouter() {
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
                            path="/subagentes/cadastrar"
                            element={<>Page</>}
                        />
                        <Route
                            path="/subagente/:id_agente"
                            element={<>Page</>}
                        />
                        
                        <Route
                            path="/usuarios"
                            element={<Usuarios />}
                        />
                        <Route path="/usuarios/cadastrar" element={<>Page</>} />
                        <Route path="/perfil/:id_usuario" element={<>Page</>} />
                        <Route path="/perfil" element={<>Page</>} />
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
