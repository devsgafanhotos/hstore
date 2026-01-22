import { getModels } from "../../config/postgresqlClient.js";
import { hoje } from "../../shared/utils/date.js";
const {
    pagamentos: pagamentos_model,
    agentes: agente_model,
    faturacoes: faturacoes_model,
} = getModels();

class classRelatoriosServices {
    async getRelatorio({
        data = hoje,
        tipo = "Diario",
        forma_pagamento = null,
        nome_agente = null,
    }) {
        const ano = new Date(data).getFullYear();
        const mes = new Date(data).getMonth() + 1;
        const dia = new Date(data).getDay();

        const agenteEncontrado = await agente_model.findOne({
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

        const formaPagamentoCondition =
            forma_pagamento && where(col("forma_pagamento"), forma_pagamento);

        const diaCondition =
            tipo === "Diario" && where(fn("DAY", col("data_faturacao")), dia);

        const responseObject = {
            success: Boolean,
            message: "Relatório!",
            meta: {
                data,
                agente_id: agenteEncontrado?.id_agente,
                forma_pagamento,
                tipo,
                totalFaturacoes: Number,
                totalFaturado,
            },
            data: Array,
        };

        const totalFaturado = await faturacoes_model.sum("valor", {
            where: {
                [Op.and]: [
                    where(fn("YEAR", col("data_faturacao")), ano),
                    where(fn("MONTH", col("data_faturacao")), mes),
                    diaCondition,
                    formaPagamentoCondition,
                    idAgenteCondition,
                ],
            },
            raw: true,
        });
        const totalFaturacoes = await faturacoes_model.count({
            where: {
                [Op.and]: [
                    where(fn("YEAR", col("data_faturacao")), ano),
                    where(fn("MONTH", col("data_faturacao")), mes),
                    diaCondition,
                    formaPagamentoCondition,
                    idAgenteCondition,
                ],
            },
            raw: true,
        });
        const resumoDeAgentes = await faturacoes_model.findAll({
            attributes: [
                "agente_id",
                [fn("SUM", col("valor")), "totalFaturado"],
                [col("agente.nome"), "agente"],
            ],
            group: ["agente_id"],
            where: {
                [Op.and]: [
                    where(fn("YEAR", col("data_faturacao")), ano),
                    where(fn("MONTH", col("data_faturacao")), mes),
                    diaCondition,
                    formaPagamentoCondition,
                    idAgenteCondition,
                ],
            },
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [[col("agente.nome"), "ASC"]],
            raw: true,
        });

        const totalPago = await pagamentos_model.sum("valor", {
            where: {
                [Op.and]: [
                    where(fn("YEAR", col("data_faturacao")), ano),
                    where(fn("MONTH", col("data_faturacao")), mes),
                    diaCondition,
                    formaPagamentoCondition,
                    idAgenteCondition
                ],
            },
            raw: true,
        });

        responseObject["message"] = "Relatório diário!";
        responseObject["meta"].totalFaturacoes = totalFaturacoes;
        responseObject["meta"].totalFaturado = totalFaturado;
        responseObject["data"] = resumoDeAgentes;

        return responseObject;
    }
}

const RelatoriosServices = new classRelatoriosServices();
export default RelatoriosServices;
