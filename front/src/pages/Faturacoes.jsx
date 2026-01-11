import {
    Autocomplete,
    Box,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { api } from "../api/axios";
import MyList from "../components/List/MyList";
import { FaFileInvoiceDollar, FaQuestion } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import MyDialog from "../components/modal/MyDialog";
import MyButton from "../components/form/MyButton";

export default function Faturacoes() {
    const [openDialog, setOpenDialog] = useState(false);
    const onCloseDialog = () => setOpenDialog(false);
    const onOpenDialog = () => setOpenDialog(true);
    const [dialogTitle, setDialogTitle] = useState("");

    const [faturacoes, setFaturacoes] = useState([]);
    const [filterValue, setFilterValue] = useState({
        dataInicio: new Date(0).toLocaleString(),
        dataFim: new Date().toLocaleString(),
        forma_pagamento: null,
        tipo_faturacao: null,
    });
    const [pageState, setPageState] = useState("loading");

    async function getFaturacoes() {
        try {
            const url = "/fat/faturacoes";
            const { data } = await api.get(url, {
                params: {
                    dataInicio: new Date(filterValue.dataInicio),
                    dataFim: new Date(filterValue.dataFim),
                    forma_pagamento: filterValue.forma_pagamento,
                    tipo_faturacao: filterValue.tipo_faturacao,
                },
            });
            return setFaturacoes([...data.data]);
        } catch (error) {
            console.log(error);
            setFaturacoes([]);
        } finally {
            setPageState("done");
        }
    }

    const handleFilter = (newFilter) => {
        setFilterValue(newFilter);
    };

    useEffect(() => {
        setPageState("loading");
        getFaturacoes();
    }, [filterValue]);

    function MyToolIcon({ title = "Title", Icon = FaQuestion, handleClick }) {
        return (
            <Tooltip title={title}>
                <IconButton
                    sx={{
                        padding: 1.5,
                        borderRight: ".1px solid var(--color-gray-light)",
                        backgroundColor: "var(--color-bg)",
                        borderRadius: "0px",
                    }}
                    onClick={() => {
                        handleClick();
                        onOpenDialog();
                    }}
                >
                    <Icon size={15} color="var(--color-primary)" />
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <Box flex={"1"} padding={0}>
            <Box py={{ sx: 0, md: 1 }} display={"flex"} justifyContent={"end"}>
                <Box
                    sx={{
                        marginBottom: 1,
                        backgroundColor: "var(--color-bg)",
                        borderRadius: "25px",
                        display: "flex",
                        overflow: "hidden",
                    }}
                >
                    <MyToolIcon
                        title="Ver Resumos"
                        Icon={FaFileInvoiceDollar}
                        handleClick={() => {
                            setDialogTitle("Resumos");
                        }}
                    />
                    <MyToolIcon
                        title="Filtrar"
                        Icon={FaFilter}
                        handleClick={() => {
                            setDialogTitle("Filtrar Faturações");
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            columnGap: 1,
                            padding: 1,
                            paddingRight: 0,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {new Date(
                                filterValue.dataInicio
                            ).toLocaleDateString() ?? ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {new Date(
                                filterValue.dataFim
                            ).toLocaleDateString() ?? ""}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {filterValue.agente_id ?? ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {filterValue.id_faturacao ?? ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {filterValue.forma_pagamento ?? ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {filterValue.tipo_faturacao ?? ""}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <MyList
                ListItems={faturacoes}
                title="Faturações"
                pageState={pageState}
                buttonPluss={{ to: "/faturacoes/new" }}
            />
            <MyDialog
                open={openDialog}
                onClose={onCloseDialog}
                title={dialogTitle}
            >
                <FormFilter
                    onCloseDialog={onCloseDialog}
                    handleFilter={handleFilter}
                />
            </MyDialog>
        </Box>
    );
}

function FormFilter({ onCloseDialog, handleFilter }) {
    const [formFilter, setFormFilter] = useState({
        dataInicio: new Date(0).toLocaleString(),
        dataFim: new Date().toLocaleString(),
        forma_pagamento: null,
        tipo_faturacao: null,
    });
    return (
        <Box>
            <Stack spacing={2} mt={1}>
                <Autocomplete
                    options={["Físico", "Electrônico"]}
                    value={formFilter.tipo_faturacao}
                    onChange={(_, v) =>
                        setFormFilter({
                            ...formFilter,
                            tipo_faturacao: v,
                        })
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tipo Faturacao"
                            fullWidth
                        />
                    )}
                />
                <Autocomplete
                    options={["Quinzenal", "Mensal"]}
                    value={formFilter.forma_pagamento}
                    onChange={(_, v) =>
                        setFormFilter({
                            ...formFilter,
                            forma_pagamento: v,
                        })
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Forma Pagamento"
                            fullWidth
                        />
                    )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                        label="Data Inicial"
                        value={dayjs(formFilter.dataInicio)}
                        onChange={(v) =>
                            setFormFilter({
                                ...formFilter,
                                dataInicio: v,
                            })
                        }
                    />
                    <MobileDateTimePicker
                        label="Data Final"
                        value={dayjs(formFilter.dataFim)}
                        onChange={(v) =>
                            setFormFilter({
                                ...formFilter,
                                dataFim: v,
                            })
                        }
                    />
                </LocalizationProvider>
                <Box>
                    <MyButton
                        variant="outlined"
                        handleClick={onCloseDialog}
                        sx={{ marginRight: 2 }}
                    >
                        Cancelar
                    </MyButton>
                    <MyButton
                        handleClick={() => {
                            handleFilter(formFilter);
                        }}
                    >
                        Aplicar
                    </MyButton>
                </Box>
            </Stack>
        </Box>
    );
}
