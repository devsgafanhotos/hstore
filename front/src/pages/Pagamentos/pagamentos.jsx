import {
    Autocomplete,
    Box,
    Button,
    Chip,
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
import SmartList from "../../components/shower/SmartList";
import { FaFileInvoiceDollar, FaQuestion } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import MyDialog from "../../components/modal/MyDialog";
import { useCache } from "../../hooks/useCache";
import { useAlert } from "../../hooks/useAlert";

export default function Pagamentos() {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState(false);
    const { setAlert } = useAlert()

    const onCloseDialog = () => setOpenDialog(false);
    const onOpenDialog = () => setOpenDialog(true);

    const [pagamentos, setPagamentos] = useState(null);

    const [filterValue, setFilterValue] = useState({
        data: new Date(),
        nome_agente: null,
        id_pagamento: null,
        parcela: "Única",
        estado: "Pendentes",
    });
    const [pageState, setPageState] = useState("loading");

    async function getPagamentos(params) {
        try {
            setPageState("loading");
            const { data } = await api.get("/pag/pagamentos", {
                params: {
                    data: new Date(params.data),
                    nome_agente: params.nome_agente,
                    id_pagamento: params.id_pagamento,
                    parcela: params.parcela,
                    estado: params.estado,
                },
            });
            
            if (data?.message?.includes("Ainda não é período")) {
                setAlert({
                    type: "SHOW",
                    text: data.message,
                    style: "warning",
                })
            }

            setFilterValue({ ...params });
            return setPagamentos({ data: data.data, meta: data.meta });
        } catch (error) {
            console.log(error);
            setPagamentos({ data: [], meta: null });
        } finally {
            setPageState("done");
        }
    }

    const handleFilter = (newFilter) => {
        setFilterValue(newFilter);
        getPagamentos(newFilter);
    };

    function MyToolIcon({
        title = "Title",
        // eslint-disable-next-line no-unused-vars
        Icon = FaQuestion,
        handleClick,
    }) {
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

    const BoxFilter = (
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
                        setDialogTitle("Filtrar Pagamentos");
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
                        {new Date(filterValue.data).toLocaleDateString() ?? ""}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {filterValue.nome_agente?.split(" ")[0] ?? ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {filterValue.estado ?? ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {filterValue.parcela ?? ""}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );

    useEffect(() => {
        getPagamentos(filterValue);
    }, []);

    return (
        <Box flex={"1"}>
            <SmartList
                ListItems={pagamentos?.data}
                title={`Pagamentos ${filterValue.estado}`}
                pageState={pageState}
                FormFilter={BoxFilter}
                extraButton={
                    <Chip
                        sx={{
                            color: "secondary.main",
                            fontWeight: 600,
                            fontSize: 20,
                        }}
                        label={pagamentos?.meta?.total || 0}
                    />
                }
            />
            <MyDialog
                open={openDialog}
                onClose={onCloseDialog}
                title={dialogTitle}
            >
                {dialogTitle === "Filtrar Pagamentos" ? (
                    <FormFilter
                        onCloseDialog={onCloseDialog}
                        handleFilter={handleFilter}
                        initialFilter={filterValue}
                    />
                ) : (
                    <>
                        {/*resumes && (
                            <Box sx={{ padding: 4 }}>
                                <div className="flex items-center gap-2 mb-2">
                                    <Typography
                                        variant="caption"
                                        sx={{ fontSize: "1rem" }}
                                    >
                                        Total Vendido:{" "}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: "1rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {" "}
                                        {getMoeda(
                                            resumes?.totalVendido || 0,
                                        )}{" "}
                                    </Typography>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Typography
                                        variant="caption"
                                        sx={{ fontSize: "1rem" }}
                                    >
                                        Total de Faturações:{" "}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: "1rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {" "}
                                        {resumes?.total || 0}{" "}
                                    </Typography>
                                </div>
                            </Box>
                        )*/}
                    </>
                )}
            </MyDialog>
        </Box>
    );
}

function FormFilter({ onCloseDialog, handleFilter, initialFilter }) {
    const [formFilter, setFormFilter] = useState({
        data: initialFilter.data,
        nome_agente: initialFilter.nome_agente,
        id_pagamento: initialFilter.id_pagamento,
        parcela: initialFilter.parcela,
        estado: initialFilter.estado,
    });
    const { agents } = useCache().entidades;

    return (
        <Box>
            <Stack spacing={2} mt={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                        label="Data"
                        value={dayjs(formFilter.data)}
                        onChange={(v) =>
                            setFormFilter({
                                ...formFilter,
                                data: v,
                            })
                        }
                    />
                </LocalizationProvider>
                <Autocomplete
                    options={["Única", "Primeira", "Segunda"]}
                    value={formFilter.parcela}
                    onChange={(_, v) =>
                        setFormFilter({
                            ...formFilter,
                            parcela: v,
                        })
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="Parcela" fullWidth />
                    )}
                />
                <Autocomplete
                    options={["Pendentes", "Efeituados"]}
                    value={formFilter.estado}
                    onChange={(_, v) =>
                        setFormFilter({
                            ...formFilter,
                            estado: v,
                        })
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="Estado" fullWidth />
                    )}
                />
                {formFilter.estado === "Efeituados" && (
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
                )}

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
