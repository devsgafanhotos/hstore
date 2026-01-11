import { col, Op, where } from "sequelize";
import { getModels } from "../../config/postgresqlClient.js";
const { faturacoes: faturacoes_model, agentes: agent_model } = getModels();

class classFaturacoesServices {
    async cadastrar(faturacao) {
        return {
            success: true,
            message: "Cadastro feito com sucesso!",
            faturacao: faturacao_criado,
        };
    }

    async getFaturacoes(
        dataInicio = new Date(),
        dataFim = new Date(),
        { agente_id, id_faturacao, tipo_faturacao, forma_pagamento }
    ) {
        const idAgenteCondition =
            agente_id && where(col("agente_id"), agente_id);
        const idFaturacaoCondition =
            id_faturacao && where(col("id_faturacao"), id_faturacao);

        const tipoFaturacaoCondition =
            tipo_faturacao && where(col("tipo_faturacao"), tipo_faturacao);

        const formaPagamentoCondition =
            forma_pagamento && where(col("forma_pagamento"), forma_pagamento);

        let faturacoes_encontradas = await faturacoes_model.findAll({
            attributes: [
                ["id_facturacao", "id"],
                "valor",
                ["data_faturacao", "dataFaturacao"],
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
            raw: true,
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [["data_faturacao", "DESC"]],
        });

        const meta = {
            dataInicio,
            dataFim,
            agente_id,
            id_faturacao,
            tipo_faturacao,
            forma_pagamento,
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
            data: faturacoes_encontradas.slice(-40),
        };
    }

    async getTipoFaturação(id_faturacao, data) {
        return {
            success: true,
            data: "faturacao_encontrado",
        };
    }
}

const FaturacoesServices = new classFaturacoesServices();
export default FaturacoesServices;
