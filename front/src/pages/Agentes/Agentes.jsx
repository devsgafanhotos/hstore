import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

import SmartList from "../../components/shower/SmartList";
import { useCache } from "../../hooks/useCache";
import SearchField from "../../components/shower/SearchField";
import MyDialog from "../../components/modal/MyDialog";
import FormCadastrarAgente from "./Cadastrar";

let agenteBase = [];
const max_items = 50;
export default function Agentes() {
    const navigate = useNavigate();
    const { agents } = useCache().entidades;
    const [openDialog, setOpenDialog] = useState(false);

    const onCLoseDialog = () => setOpenDialog(false);
    const onOpenDialog = () => setOpenDialog(true);

    const [agentes, setAgentes] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [pageState, setPageState] = useState("loading");

    async function getAgente() {
        try {
            agenteBase.push(...agents);

            return setAgentes(agents?.slice(0, max_items));
        } catch (error) {
            console.log(error);

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
                        filterValue?.toLocaleLowerCase(),
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleShowProfile = (agent) => {
        navigate(`/subagente/${agent.id}`, { state: { agent } });
    };

    return (
        <Box sx={{ flex: "1" }}>
            <SmartList
                ListItems={agentes}
                title={"Subagentes"}
                pageState={pageState}
                handleItemClick={handleShowProfile}
                PlusAction={onOpenDialog}
                FormFilter={
                    <SearchField
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                    />
                }
                Labels={["id", "nome", "telefone"]}
            />

            <MyDialog
                open={openDialog}
                onClose={onCLoseDialog}
                title="Novo Agente"
            >
                <FormCadastrarAgente onCLoseDialog={onCLoseDialog} />
            </MyDialog>
        </Box>
    );
}
