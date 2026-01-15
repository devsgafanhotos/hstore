import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyListItems from "../../components/shower/MyListItems";
import { useCache } from "../../hooks/useCache";
import SearchField from "../../components/shower/SearchField";

let agenteBase = [];
const max_items = 50;
export default function Agentes() {
    const navigate = useNavigate();
    const { agents } = useCache().entidades;

    const [agentes, setAgentes] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [pageState, setPageState] = useState("loading");

    async function getAgente() {
        try {
            agenteBase.push(...agents);

            return setAgentes(agents?.slice(-max_items));
        } catch (error) {
            setAgentes([]);
        } finally {
            setPageState("done");
        }
    }

    useEffect(() => {
        setPageState("loading");
        setAgentes(() => {
            const newAgente = agenteBase.filter((value) => {
                const nome = value?.nome?.toLocaleLowerCase();
                const telefone = value?.telefone;
                const id = value?.id;

                if (
                    String(nome).includes(filterValue?.toLocaleLowerCase()) ||
                    String(telefone).includes(
                        filterValue?.toLocaleLowerCase()
                    ) ||
                    String(id).includes(filterValue?.toLocaleLowerCase())
                )
                    return value;
            });
            return newAgente.slice(-max_items);
        });
        const timeOut = setTimeout(() => {
            setPageState("done");
        }, 1000);

        return () => clearTimeout(timeOut);
    }, [filterValue]);

    useEffect(() => {
        agenteBase = [];
        setFilterValue("");
        setPageState("loading");
        getAgente();
    }, []);

    return (
        <Box sx={{ flex: "1" }}>
            <SearchField filterValue={filterValue} setFilterValue={setFilterValue} />
            <MyListItems
                ListItems={agentes}
                title={"Subagentes"}
                pageState={pageState}
                buttonPluss={{ to: `/subagente/cadastrar` }}
                handleItemClick={(id) => navigate(`/subagente/${id}`)}
            />
        </Box>
    );
}
