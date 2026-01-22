import { col, fn, Op, where } from "sequelize";
import { getModels } from "../../config/postgresqlClient.js";
const { faturacoes: faturacoes_model, agentes: agent_model } = getModels();

class classFaturacoesServices {
    async cadastrar(faturacao) {
        const {
            usuario_id,
            nome_agente,
            valor_electronico,
            valor_fisico,
            forma_pagamento,
        } = faturacao;

        const agenteEncontrado = await agent_model.findOne({
            where: { nome: nome_agente },
            raw: true,
        });

        if (!agenteEncontrado) {
            return {
                successo: false,
                message: "Sub-agente inesistente!",
                status: 404,
            };
        }

        if (valor_electronico > 500 || valor_fisico > 500) {
            if (valor_electronico > 500) {
                const faturacaoCriada = await faturacoes_model.create({
                    agente_id: agenteEncontrado.id_agente,
                    usuario_id: usuario_id,
                    tipo_faturacao: "Electrônico",
                    valor: valor_electronico,
                    forma_pagamento: forma_pagamento,
                });
            }

            if (valor_fisico > 500) {
                const faturacaoCriada = await faturacoes_model.create({
                    agente_id: agenteEncontrado.id_agente,
                    usuario_id: usuario_id,
                    tipo_faturacao: "Físico",
                    valor: valor_fisico,
                    forma_pagamento: forma_pagamento,
                });
            }
        } else {
            return {
                successo: false,
                message: "Informe o/s valor da compra!",
                status: 400,
            };
        }

        return {
            success: true,
            message: "Faturação registrada com sucesso!",
            data: {
                usuario_id,
                id_agente: agenteEncontrado.id_agente,
                valor_electronico,
                valor_fisico,
                forma_pagamento,
            },
        };
    }

    async getFaturacoes(
        dataInicio = new Date(),
        dataFim = new Date(),
        {
            nome_agente,
            id_faturacao,
            tipo_faturacao,
            forma_pagamento,
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

        const idFaturacaoCondition =
            id_faturacao && where(col("id_faturacao"), id_faturacao);

        const tipoFaturacaoCondition =
            tipo_faturacao && where(col("tipo_faturacao"), tipo_faturacao);

        const formaPagamentoCondition =
            forma_pagamento && where(col("forma_pagamento"), forma_pagamento);

        const faturacoes_encontradas = await faturacoes_model.findAll({
            raw: true,
            limit: Number(limit),
            attributes: [
                ["id_facturacao", "id"],
                "valor",
                ["data_faturacao", "data"],
                ["tipo_faturacao", "tipoFaturacao"],
                ["forma_pagamento", "formaPagamento"],
                "agente_id",
                "usuario_id",
                [col("agente.nome"), "agente"],
            ],
            where: {
                [Op.and]: [
                    where(col("data_faturacao"), {
                        [Op.between]: [dataInicio, dataFim],
                    }),
                    idAgenteCondition,
                    idFaturacaoCondition,
                    tipoFaturacaoCondition,
                    formaPagamentoCondition,
                ],
            },
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [["data_faturacao", "DESC"]],
        });

        const totalVendido = await faturacoes_model.sum("valor", {
            where: {
                [Op.and]: [
                    where(col("data_faturacao"), {
                        [Op.between]: [dataInicio, dataFim],
                    }),
                    idAgenteCondition,
                    idFaturacaoCondition,
                    tipoFaturacaoCondition,
                    formaPagamentoCondition,
                ],
            },
        });

        const meta = {
            dataInicio,
            dataFim,
            agente_id: agenteEncontrado?.id_agente,
            id_faturacao,
            tipo_faturacao,
            forma_pagamento,
            totalVendido,
            total: faturacoes_encontradas.length,
        };
        if (!faturacoes_encontradas) {
            return {
                success: false,
                meta,
                data: [],
            };
        }

        return {
            success: true,
            meta,
            data: faturacoes_encontradas,
        };
    }

    async getFormaPagamento(nome_agente, data = new Date()) {
        const agenteEncontrado = await agent_model.findOne({
            where: { nome: nome_agente },
            raw: true,
        });

        if (!agenteEncontrado) {
            return {
                successo: false,
                message: "Sub-agente inesistente!",
                status: 404,
            };
        }

        const mes = new Date(data).getMonth() + 1;
        const ano = new Date(data).getFullYear();
        const faturacaoEncontrado = await faturacoes_model.findOne({
            attributes: [["forma_pagamento", "formaPagamento"]],
            where: {
                [Op.and]: [
                    where(fn("YEAR", col("data_faturacao")), ano),
                    where(fn("MONTH", col("data_faturacao")), mes),
                    where(col("agente_id"), agenteEncontrado.id_agente),
                ],
            },
            raw: true,
        });

        console.log(nome_agente);
        console.log(faturacaoEncontrado);

        return {
            success: true,
            data: faturacaoEncontrado,
        };
    }
}

const FaturacoesServices = new classFaturacoesServices();
export default FaturacoesServices;
