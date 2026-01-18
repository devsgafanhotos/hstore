import { useState } from "react";
import { ActionContext } from "../context/ActionContext";

export default function ActionProvider({ children }) {
    const [newSell, setNewSell] = useState({ agent: null, show: false });
    const [newEntidade, setNewEntidade] = useState({
        entidade: null,
        show: false,
    });

    const handleSell = (show = true, agent) =>
        setNewSell({ ...newSell, agent: agent, show: show });

    const handleEntidade = (show = true, entidade) =>
        setNewEntidade({ ...newEntidade, entidade: entidade, show: show });

    return (
        <ActionContext.Provider
            value={{
                sellState: newSell.show,
                handleSell,
                handleEntidade,
                entidadeState: newEntidade,
            }}
        >
            {children}
        </ActionContext.Provider>
    );
}
