import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyListItems from "../../components/shower/MyListItems";
import { useCache } from "../../hooks/useCache";
import SearchField from "../../components/shower/SearchField";

let usuariosBase = [];
const max_items = 50;
export default function Usuarios() {
    const navigate = useNavigate();
    const { users } = useCache().entidades;

    const [usuarios, setUsuarios] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [pageState, setPageState] = useState("loading");

    async function getUsuarios() {
        try {
            usuariosBase.push(...users);

            return setUsuarios(users?.slice(-max_items));
        } catch (error) {
            setUsuarios([]);
        } finally {
            setPageState("done");
        }
    }

    useEffect(() => {
        setPageState("loading");
        setUsuarios(() => {
            const newUsuario = usuariosBase.filter((value) => {
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
            return newUsuario.slice(-max_items);
        });
        const timeOut = setTimeout(() => {
            setPageState("done");
        }, 1000);

        return () => clearTimeout(timeOut);
    }, [filterValue]);

    useEffect(() => {
        usuariosBase = [];
        setFilterValue("");
        setPageState("loading");
        getUsuarios();
    }, []);

    return (
        <Box sx={{ flex: "1" }}>
            <SearchField
                filterValue={filterValue}
                setFilterValue={setFilterValue}
            />
            <MyListItems
                ListItems={usuarios}
                title={"Usuarios"}
                pageState={pageState}
                buttonPluss={{ to: `/usuario/cadastrar` }}
                handleItemClick={(id) => navigate(`/usuario/${id}`)}
            />
        </Box>
    );
}
