import { Op, where, col, fn, literal } from "sequelize";
import { getModels } from "../../config/postgresqlClient.js";
const { pagamentos: pagamentos_model, agentes: agent_model } = getModels();

class classPagamentosServices {
    async cadastrar(pagamento) {
        return {
            success: true,
            message: "Cadastro feito com sucesso!",
            pagamento: pagamento_criado,
        };
    }

    async getPagamentos(
        dataInicio = new Date(),
        dataFim = new Date(),
        {
            nome_agente = null,
            id_pagamento = null,
            parcela = "Única",
            estado = "Pendente",
            bonus = null,
            limit = 1000,
        }
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

        const idPagamentoCondition =
            id_pagamento && where(col("id_pagamento"), id_pagamento);

        const parcelaCondition = parcela && where(col("parcela"), parcela);

        const pagamentos_efeituados = await pagamentos_model.findAll({
            raw: true,
            limit: Number(limit),
            attributes: [
                ["id_pagamento", "id"],
                ["data_correspondente", "dataCorrespondente"],
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
                    where(col("data_correspondente"), {
                        [Op.between]: [dataInicio, dataFim],
                    }),
                    idAgenteCondition,
                    idPagamentoCondition,
                    parcelaCondition,
                ],
            },
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [["data_correspondente", "DESC"]],
        });

        const meta = {
            dataInicio,
            dataFim,
            agente_id: agenteEncontrado?.id_agente,
            id_pagamento,
            parcela,
            limit,
            estado,
            pagamentos: pagamentos_efeituados.length,
        };

        if (estado === "Pago") {
            if (!pagamentos_efeituados) {
                return {
                    success: false,
                    meta,
                    data: [],
                };
            }

            return {
                success: true,
                meta,
                data: pagamentos_efeituados,
            };
        }

        const pagamentos_pendentes = this.__getPagamentosPendentes();
        if (!pagamentos_pendentes) {
            return {
                success: false,
                meta,
                data: [],
            };
        }

        return {
            success: true,
            meta,
            data: [],
        };
    }

    async __getPagamentosPendentes() {
        /*
        

        */
    }
}

const PagamentoServices = new classPagamentosServices();
export default PagamentoServices;
