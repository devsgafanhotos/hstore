import {
    Autocomplete,
    Box,
    Button,
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

import { api } from "../../api/axios";
import MyListItems from "../../components/shower/MyListItems";
import { FaFileInvoiceDollar, FaPlus, FaQuestion } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import MyDialog from "../../components/modal/MyDialog";
import { useAction } from "../../hooks/useAction";
import { useCache } from "../../hooks/useCache";
import { amanha, hoje } from "../../utils/date";

export default function Faturacoes() {
    const [openDialog, setOpenDialog] = useState(false);
    const { handleSell } = useAction();
    const { faturacoes: initialFaturacoes } = useCache().entidades;

    const onCloseDialog = () => setOpenDialog(false);
    const onOpenDialog = () => setOpenDialog(true);
    const [dialogTitle, setDialogTitle] = useState("");

    const [faturacoes, setFaturacoes] = useState(null);
    const [filterValue, setFilterValue] = useState({
        dataInicio: hoje,
        dataFim: amanha,
        forma_pagamento: null,
        tipo_faturacao: null,
        nome_agente: null,
    });
    const [pageState, setPageState] = useState("loading");

    async function getFaturacoes(params) {
        try {
            const { data } = await api.get("/fat/faturacoes", {
                params: {
                    dataInicio: params.dataInicio,
                    dataFim: params.dataFim,
                    forma_pagamento: params.forma_pagamento,
                    tipo_faturacao: params.tipo_faturacao,
                    nome_agente: params.nome_agente,
                },
            });

            setFilterValue({ ...params });
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
        getFaturacoes(newFilter);
    };

    useEffect(() => {
        setFaturacoes([...initialFaturacoes]);
        setPageState("done");
    }, [initialFaturacoes]);

    // eslint-disable-next-line no-unused-vars
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
    const buttonAdd = (
        <IconButton onClick={() => handleSell(true)}>
            <FaPlus color="#F37021" size={25} />
        </IconButton>
    );

    return (
        <Box flex={"1"}>
            <Box display={"flex"} justifyContent={"end"}>
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
                            paddingRight: 2,
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
                            {filterValue.nome_agente?.split(" ")[0] ?? ""}
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
            <MyListItems
                ListItems={faturacoes}
                title="Faturações"
                pageState={pageState}
                extraButton={buttonAdd}
            />
            <MyDialog
                open={openDialog}
                onClose={onCloseDialog}
                title={dialogTitle}
            >
                {dialogTitle === "Filtrar Faturações" ? (
                    <FormFilter
                        onCloseDialog={onCloseDialog}
                        handleFilter={handleFilter}
                        initialFilter={filterValue}
                    />
                ) : (
                    <>Resumos</>
                )}
            </MyDialog>
        </Box>
    );
}

function FormFilter({ onCloseDialog, handleFilter, initialFilter }) {
    const [formFilter, setFormFilter] = useState({
        dataInicio: initialFilter.dataInicio,
        dataFim: initialFilter.dataFim,
        forma_pagamento: initialFilter.forma_pagamento,
        tipo_faturacao: initialFilter.tipo_faturacao,
        nome_agente: initialFilter.nome_agente,
    });
    const { agents } = useCache().entidades;

    return (
        <Box>
            <Stack spacing={2} mt={1}>
                <Autocomplete
                    options={agents.map((agent) => agent.nome)}
                    value={formFilter.nome_agente}
                    onChange={(_, v) =>
                        setFormFilter({
                            ...formFilter,
                            nome_agente: v,
                        })
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="Agente" fullWidth />
                    )}
                />
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
                    <Button
                        variant="outlined"
                        onClick={onCloseDialog}
                        sx={{ marginRight: 2 }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleFilter(formFilter);
                            onCloseDialog();
                        }}
                    >
                        Aplicar
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}
