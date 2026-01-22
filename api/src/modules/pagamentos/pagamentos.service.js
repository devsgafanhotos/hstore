import { Op, where, col, fn, literal } from "sequelize";
import { getModels } from "../../config/postgresqlClient.js";
const { pagamentos: pagamentos_model, agentes: agent_model } = getModels();
import PagamentosUtilFunctios from "./pagamentos.utils.js";

class classPagamentosServices {
    async registrar(pagamentosPendente) {
        /**
         * [
    {
        "agente_id": "679306",
        "usuario_id": "1",
        "data_correspondente": "2025-10",
        "parcela": "Segunda",
        "resto": "11500",
        "bonus": "900"
    }
]
         */
        const pagamentosRegistrados =
            await pagamentos_model.bulkCreate(pagamentosPendente);

        return {
            success: true,
            message: "Pagamentos registrados com sucesso!",
            data: pagamentosRegistrados,
            meta: {
                total: pagamentosRegistrados.length,
            },
        };
    }

    async getPagamentos(
        data = new Date(),
        estado = "Pendentes",
        {
            nome_agente = null,
            id_pagamento = null,
            parcela = "Única",
            bonus = null,
            limit = 1000,
        },
    ) {
        const agenteEncontrado = await agent_model.findOne({
            where: { nome: nome_agente },
            raw: true,
        });

        if (!agenteEncontrado && nome_agente) {
            return {
                successo: false,
                message: "Sub-agente inesistente!",
                status: 404,
            };
        }

        const idAgenteCondition =
            agenteEncontrado?.id_agente &&
            where(col("agente_id"), agenteEncontrado?.id_agente);

        const parcelaCondition = parcela && where(col("parcela"), parcela);

        const ano = new Date(data).getFullYear();
        const mes = new Date(data).getMonth() + 1;

        const responseObject = {
            success: Boolean,
            message: "Pagamentos encontrados!",
            meta: {
                data,
                agente_id: agenteEncontrado?.id_agente,
                id_pagamento,
                parcela,
                limit,
                estado,
            },
            data: Array,
        };

        if (estado === "Pendentes") {
            const response = await this.__getPagamentosPendentes({
                idAgente: idAgenteCondition,
                parcela: parcela,
                limit,
                ano: ano,
                mes: mes,
            });

            responseObject.data = response.data;
            responseObject.success = response.success;
            responseObject.message = response?.message;
            responseObject.meta = { ...responseObject.meta, ...response.meta };
        } else if (estado === "Efeituados") {
            const response = await this.__getPagamentosEfeituados({
                idAgente: idAgenteCondition,
                parcela: parcelaCondition,
                id_pagamento: id_pagamento,
                limit,
                ano: ano,
                mes: mes,
            });

            responseObject.data = response.data;
            responseObject.success = response.success;
            responseObject.meta = { ...responseObject.meta, ...response.meta };
        } else {
            throw new Error("Parametro estado inválido!");
        }

        return responseObject;
    }

    async __getPagamentosEfeituados({
        idAgente = null,
        parcela = null,
        id_pagamento = null,
        limit = null,
        mes,
        ano,
    }) {
        const idPagamentoCondition =
            id_pagamento && where(col("id_pagamento"), id_pagamento);

        const pagamentos_efeituados = await pagamentos_model.findAll({
            raw: true,
            limit: Number(limit),
            attributes: [
                ["id_pagamento", "id"],
                ["data_correspondente", "data"],
                ["data_pagamento", "dataPagamento"],
                ["parcela", "parcela"],
                "bonus",
                "resto",
                "agente_id",
                "usuario_id",
                [col("agente.nome"), "agente"],
            ],
            where: {
                [Op.and]: [
                    where(fn("YEAR", col("data_correspondente")), ano),
                    where(fn("MONTH", col("data_correspondente")), mes),
                    idAgente,
                    idPagamentoCondition,
                    parcela,
                ],
            },
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [["data_correspondente", "DESC"]],
        });

        const totalBonus = await pagamentos_model.sum("bonus", {
            where: {
                [Op.and]: [
                    where(fn("YEAR", col("data_correspondente")), ano),
                    where(fn("MONTH", col("data_correspondente")), mes),
                    idAgente,
                    idPagamentoCondition,
                    parcela,
                ],
            },
            raw: true,
        });

        const totalResto = await pagamentos_model.sum("resto", {
            where: {
                [Op.and]: [
                    where(fn("YEAR", col("data_correspondente")), ano),
                    where(fn("MONTH", col("data_correspondente")), mes),
                    idAgente,
                    idPagamentoCondition,
                    parcela,
                ],
            },
            raw: true,
        });

        const meta = {
            totalBonusPago: totalBonus,
            //totalCaixasPago: 0,
            totalResto: totalResto,
            total: pagamentos_efeituados.length,
        };

        return {
            success: true,
            data: pagamentos_efeituados,
            meta
        };
    }

    async __getPagamentosPendentes({
        idAgente = null,
        parcela = null,
        limit = null,
        mes,
        ano,
    }) {
        const responseObject = {
            success: Boolean,
            data: Array,
            meta: Object,
        };

        let isPeriodoPagamento = true;
        /**
         * @description Para ter a lista de agentes não pagos devemos estar fora do periodo de faturação
         */
        const mesAtual = new Date().getMonth() + 1;
        const anoAtual = new Date().getFullYear();

        if (anoAtual > ano) {
            isPeriodoPagamento = true;
        } else {
            // Se a parcela for única ou a segunda
            if (parcela.includes("Única") || parcela.includes("Segunda")) {
                /**
                 * @description O pagamento não pode ser feito no mesmo mês, ou seja só podemos pagar um agente na condição anterior no mês a seguir ao mês atual
                 */
                if (mesAtual <= mes) {
                    isPeriodoPagamento = false;
                }
            } else if (parcela.includes("Primeira")) {
                /**
                 * @description Se for a primeira parcela ela pode ser paga depois da primeira quinzena do mes atual
                 */
                const diaAtual = new Date().toJSON().slice(8, 10);
                if (mesAtual <= mes) {
                    if (diaAtual <= 15) {
                        isPeriodoPagamento = false;
                    }
                }
            }
        }

        if (isPeriodoPagamento) {
            if (parcela === "Unica") {
                const data = await PagamentosUtilFunctios.getPendentesMensais(
                    ano,
                    mes,
                );

                responseObject["success"] = !!data.data;
                responseObject["meta"] = data.meta;
                responseObject["data"] = data.data;
            } else if (parcela === "Primeira") {
                const data =
                    await PagamentosUtilFunctios.getPendentesPrimeiraQuinzena(
                        ano,
                        mes,
                    );

                responseObject["success"] = !!data.data;
                responseObject["meta"] = data.meta;
                responseObject["data"] = data.data;
            } else if (parcela === "Segunda") {
                const data =
                    await PagamentosUtilFunctios.getPendentesSegundaQuinzena(
                        ano,
                        mes,
                    );

                responseObject["success"] = !!data.data;
                responseObject["meta"] = data.meta;
                responseObject["data"] = data.data;
            } else {
                responseObject["success"] = false;
                responseObject["total"] = 0;
                responseObject["data"] = [];
            }
        } else {
            responseObject["success"] = false;
            responseObject["meta"] = {};
            responseObject["message"] = "Ainda não é período de pagamento!";
            responseObject["data"] = [];
        }

        return responseObject;
    }
}

const PagamentoServices = new classPagamentosServices();
export default PagamentoServices;
