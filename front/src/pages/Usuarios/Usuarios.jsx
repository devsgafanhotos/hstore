import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyListItems from "../../components/shower/MyListItems";
import { useCache } from "../../hooks/useCache";
import SearchField from "../../components/shower/SearchField";
import { FaPlus } from "react-icons/fa6";
import MyDialog from "../../components/modal/MyDialog";
import FormCadastrarUsuario from "./Cadastrar";

let usuariosBase = [];
const max_items = 50;
export default function Usuarios() {
    const { users } = useCache().entidades;
    const navigate = useNavigate();

    const [openDialog, setOpenDialog] = useState(false);

    const onCLoseDialog = () => setOpenDialog(false);
    const onOpenDialog = () => setOpenDialog(true);

    const [usuarios, setUsuarios] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [pageState, setPageState] = useState("loading");

    async function getUsuarios() {
        try {
            usuariosBase.push(...users);

            return setUsuarios(users?.slice(-max_items));
        } catch (error) {
            console.log(error);
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

    const buttonAdd = (
        <IconButton onClick={onOpenDialog}>
            <FaPlus color="#F37021" size={25} />
        </IconButton>
    );

    const handleShowProfile = (user) => {
        navigate(`/usuario/${user.id}`, { state: { user } });
    };

    return (
        <Box sx={{ flex: "1" }}>
            <SearchField
                filterValue={filterValue}
                setFilterValue={setFilterValue}
            />
            <MyListItems
                ListItems={usuarios}
                title={"Usuarios"}
                extraButton={buttonAdd}
                pageState={pageState}
                handleItemClick={handleShowProfile}
            />

            <MyDialog
                open={openDialog}
                onClose={onCLoseDialog}
                title="Novo Usuario"
            >
                <FormCadastrarUsuario onCLoseDialog={onCLoseDialog} />
            </MyDialog>
        </Box>
    );
}
