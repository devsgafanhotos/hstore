import { Op, where, col, fn, literal } from "sequelize";

class classPagamentosUtilFunctios {
    async getFaturacoesPrimeiraQuinzena(ano, mes) {
        const faturacoesPrimeiraQuinzena = await Faturacao.findAll({
            attributes: [
                "agente_id",
                [fn("SUM", col("valor")), "total_faturado"],
            ],
            where: {
                forma_pagamento: "Quinzenal",
                [Op.and]: [
                    fn("YEAR", col("data_faturacao")),
                    ano,
                    fn("MONTH", col("data_faturacao")),
                    mes,
                    literal("DAY(data_faturacao) BETWEEN 1 AND 15"),
                ],
            },
            group: ["agente_id"],
            raw: true,
        });

        return faturacoesPrimeiraQuinzena;
    }
    async getPendentesPrimeiraQuinzena(ano, mes) {
        const dataCorrespondente = new Date(ano, mes - 1, 1);
        const pendentesPrimeiraQuinzena = await Faturacao.findAll({
            attributes: [
                "agente_id",
                [fn("SUM", col("valor")), "total_faturado"],
            ],
            where: {
                forma_pagamento: "Quinzenal",
                [Op.and]: [
                    fn("YEAR", col("data_faturacao")),
                    ano,
                    fn("MONTH", col("data_faturacao")),
                    mes,
                    literal("DAY(data_faturacao) BETWEEN 1 AND 15"),
                    literal(`
        NOT EXISTS (
          SELECT 1
          FROM pagamentos p
          WHERE
            p.agente_id = faturacoes.agente_id
            AND p.parcela = 'Primeira'
            AND p.data_correspondente = '${dataCorrespondente
                            .toISOString()
                            .slice(0, 10)}'
        )
      `),
                ],
            },
            group: ["agente_id"],
            raw: true,
        });

        return pendentesPrimeiraQuinzena;
    }



    async getFaturacoesSegundaQuinzena(ano, mes) {
        const faturacoesSegundaQuinzena = await Faturacao.findAll({
            attributes: [
                "agente_id",
                [fn("SUM", col("valor")), "total_faturado"],
            ],
            where: {
                forma_pagamento: "Quinzenal",
                [Op.and]: [
                    fn("YEAR", col("data_faturacao")), ano,
                    fn("MONTH", col("data_faturacao")), mes,
                    literal("DAY(data_faturacao) BETWEEN 16 AND 31"),
                ],
            },
            group: ["agente_id"],
            raw: true,
        });

        return faturacoesSegundaQuinzena;
    }
    async getPendentesSegundaQuinzena(ano, mes) {
        const dataCorrespondente = new Date(ano, mes - 1, 1);
        const pendentesSegundaQuinzena = await Faturacao.findAll({
            attributes: [
                "agente_id",
                [fn("SUM", col("valor")), "total_faturado"],
            ],
            where: {
                forma_pagamento: "Quinzenal",
                [Op.and]: [
                    fn("YEAR", col("data_faturacao")), ano,
                    fn("MONTH", col("data_faturacao")), mes,
                    literal("DAY(data_faturacao) BETWEEN 16 AND 31"),
                    literal(`
        NOT EXISTS (
          SELECT 1
          FROM pagamentos p
          WHERE
            p.agente_id = faturacoes.agente_id
            AND p.parcela = 'Segunda'
            AND p.data_correspondente = '${dataCorrespondente
                            .toISOString()
                            .slice(0, 10)}'
        )
      `),
                ],
            },
            group: ["agente_id"],
            raw: true,
        });

        return pendentesSegundaQuinzena;
    }



    async getFaturacoesMensais(ano, mes) {
        const faturacoesMensais = await Faturacao.findAll({
            attributes: [
                "agente_id",
                [fn("SUM", col("valor")), "total_faturado"],
            ],
            where: {
                forma_pagamento: "Mensal",
                [Op.and]: [
                    fn("YEAR", col("data_faturacao")), ano,
                    fn("MONTH", col("data_faturacao")), mes,
                ],
            },
            group: ["agente_id"],
            raw: true,
        });

        return faturacoesMensais;
    }
    async getPendentesMensais(ano, mes) {
        const dataCorrespondente = new Date(ano, mes - 1, 1);
        const pendentesMensais = await Faturacao.findAll({
            attributes: [
                "agente_id",
                [fn("SUM", col("valor")), "total_faturado"],
            ],
            where: {
                forma_pagamento: "Mensal",
                [Op.and]: [
                    fn("YEAR", col("data_faturacao")), ano,
                    fn("MONTH", col("data_faturacao")), mes,
                    literal(`
        NOT EXISTS (
          SELECT 1
          FROM pagamentos p
          WHERE
            p.agente_id = faturacoes.agente_id
            AND p.parcela = 'Única'
            AND p.data_correspondente = '${dataCorrespondente
                            .toISOString()
                            .slice(0, 10)}'
        )
      `),
                ],
            },
            group: ["agente_id"],
            raw: true,
        });

        return pendentesMensais;
    }
}

const PagamentosUtilFunctios = new classPagamentosUtilFunctios();
export default PagamentosUtilFunctios;
