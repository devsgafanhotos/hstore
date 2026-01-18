import { useEffect, useState } from "react";

import { CacheContext } from "../context/CacheContext";
import AppLoader from "../components/feedback/AppLoader";
import { api } from "../api/axios";
import { amanha, hoje } from "../utils/date";

export default function CacheProvider({ children }) {
    const [pageState, setPageState] = useState("loading");
    const [users, setUsers] = useState(null);
    const [agents, setAgents] = useState(null);
    const [faturacoes, setFaturacoes] = useState(null);
    const [reloadCache, setReloadCache] = useState({
        users: 1,
        agents: 1,
        faturacoes: 1,
    });

    const ReloadCache = (entidade = "faturacoes") => {
        const newState = () => {
            if (entidade === "faturacoes") {
                return {
                    ...reloadCache,
                    faturacoes: reloadCache.faturacoes + 1,
                };
            } else if (entidade === "agentes") {
                return { ...reloadCache, agents: reloadCache.agents + 1 };
            } else if (entidade === "users") {
                return { ...reloadCache, users: reloadCache.users + 1 };
            } else return reloadCache;
        };

        setReloadCache(newState());
    };

    async function getCache(options = { url: "", params: null, handle: null }) {
        try {
            const { data } = await api.get(options.url, {
                params: options.params,
            });

            options.handle(data.data);
            return;
        } catch (error) {
            console.log(error);

            options.handle([]);
        } finally {
            setPageState("done");
        }
    }

    useEffect(() => {
        setPageState("loading");
        getCache({ handle: setUsers, url: "/user/usuarios" });
    }, [reloadCache.users]);

    useEffect(() => {
        setPageState("loading");
        getCache({ handle: setAgents, url: "/agent/agentes" });
    }, [reloadCache.agents]);

    useEffect(() => {
        setPageState("loading");
        getCache({
            handle: setFaturacoes,
            url: "/fat/faturacoes",
            params: {
                dataInicio: hoje,
                dataFim: amanha,
                limit: 10,
            },
        });
    }, [reloadCache.faturacoes]);

    if (pageState === "loading" || !faturacoes || !agents || !users) {
        return (
            <div className="h-screen flex flex-col justify-center items-center gap-2">
                <p>Actualizando...</p>
                <AppLoader />
            </div>
        );
    }

    return (
        <CacheContext.Provider
            value={{
                entidades: { users, agents, faturacoes },
                ReloadCache,
            }}
        >
            {children}
        </CacheContext.Provider>
    );
}
