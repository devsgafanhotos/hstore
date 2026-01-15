import { useContext } from "react";
import { CacheContext } from "../context/CacheContext";

export const useCache = () => {
    const context = useContext(CacheContext);

    if (!context) {
        throw new Error("useAlert deve ser usado dentro do CacheProvider");
    }
    /*
    entidades: { users, agents },
                sellState: newSell,
                handleSell,
                setReloadCache,
    */
    return context;
};
