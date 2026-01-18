import { useContext } from "react";
import { ActionContext } from "../context/ActionContext";

export const useAction = () => {
    const context = useContext(ActionContext);

    if (!context) {
        throw new Error("useAlert deve ser usado dentro do ActionProvider");
    }
    return context;
};
