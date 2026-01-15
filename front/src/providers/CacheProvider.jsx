import { useEffect, useState } from "react";

import { CacheContext } from "../context/CacheContext";
import AppLoader from "../components/feedback/AppLoader";
import { api } from "../api/axios";

export default function CacheProvider({ children }) {
    const [pageState, setPageState] = useState("loading");
    const [users, setUsers] = useState([]);
    const [agents, setAgents] = useState([]);
    const [reloadCache, setReloadCache] = useState(1);

    const [newSell, setNewSell] = useState({ agent: null, show: false });
    const handleSell = (show=true, agent) =>
        setNewSell({ agent: agent, show: show });

    async function getCache() {
        try {
            const { data: usuarios_res } = await api.get("/user/usuarios");
            const { data: agentes_res } = await api.get("/agent/agentes");

            setUsers(usuarios_res.data);
            setAgents(agentes_res.data);

            return;
        } catch (error) {
            setUsers([]);
            setAgents([]);
        } finally {
            setPageState("done");
        }
    }

    useEffect(() => {
        getCache();
    }, [reloadCache]);

    if (pageState === "loading") {
        return (
            <div className="h-screen flex flex-col justify-center items-center gap-2">
                <p>Carregando...</p>
                <AppLoader />
            </div>
        );
    }

    return (
        <CacheContext.Provider
            value={{
                entidades: { users, agents },
                sellState: newSell,
                handleSell,
                setReloadCache,
            }}
        >
            {children}
        </CacheContext.Provider>
    );
}
