import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../../pages/Login";
import Logout from "../../pages/Logout";
import PeoplePerfil from "../../pages/PeoplePerfil";
import PeopleList from "../../pages/PeopleList";
import NewPeople from "../../pages/NewPeople";
import Faturacoes from "../../pages/Faturacoes";
import LandingPage from "../../pages/LandingPage/LandingPage";
import PublicLayout from "../../pages/LandingPage/PublicLayout";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<>Main</>} />
                        <Route path="/relatorios" element={<>/relatorios</>} />
                        <Route path="/pagamentos" element={<>/pagamentos</>} />
                        <Route path="/faturacoes" element={<Faturacoes />} />
                        <Route
                            path="/subagentes"
                            element={<PeopleList type="Subagentes" />}
                        />
                        <Route
                            path="/subagentes/cadastrar"
                            element={<NewPeople type="Subagentes" />}
                        />
                        <Route
                            path="/subagente/:id_agente"
                            element={<PeoplePerfil type="Subagentes" />}
                        />
                        <Route
                            path="/usuarios"
                            element={<PeopleList type="Usuarios" />}
                        />
                        <Route
                            path="/usuarios/cadastrar"
                            element={<NewPeople type="Usuarios" />}
                        />
                        <Route
                            path="/perfil/:id_usuario"
                            element={<PeoplePerfil type="Usuarios" />}
                        />
                        <Route path="/perfil" element={<PeoplePerfil />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<h1>Not Found</h1>} />
                    </Route>
                </Route>
                
                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
