import { Op, where, col, fn, literal } from "sequelize";
import { getModels } from "../../config/postgresqlClient.js";
const { agentes: agent_model, faturacoes: faturacoes_model } = getModels();

class classPagamentosUtilFunctios {
    async getFaturacoesPrimeiraQuinzena(ano, mes) {
        const faturacoesPrimeiraQuinzena = await faturacoes_model.findAll({
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
                    where(fn("DAY", col("data_faturacao")), {
                        [Op.between]: [1, 15],
                    }),
                    where(col("forma_pagamento"), "Quinzenal"),
                ],
            },
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [[col("agente.nome"), "ASC"]],
            raw: true,
        });

        return faturacoesPrimeiraQuinzena;
    }
    async getPendentesPrimeiraQuinzena(ano, mes) {
        const dataCorrespondente = `${ano}-${mes >= 10 ? mes : "0" + mes}-01`;
        const pendentesPrimeiraQuinzena = await faturacoes_model.findAll({
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
                    where(fn("DAY", col("data_faturacao")), {
                        [Op.between]: [1, 15],
                    }),
                    where(col("forma_pagamento"), "Quinzenal"),
                    literal(`
        NOT EXISTS (
          SELECT 1
          FROM pagamentos p
          WHERE
            p.agente_id = faturacoes.agente_id
            AND p.parcela = 'Primeira'
            AND p.data_correspondente = '${dataCorrespondente}'
        )
      `),
                ],
            },
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [[col("agente.nome"), "ASC"]],
            raw: true,
        });

        const meta = {
            totalBonusPendente: 0,
            totalCaixasPendente: 0,
            totalRestoPendente: 0,
            total: pendentesPrimeiraQuinzena.length,
        };
        pendentesPrimeiraQuinzena.map((pendente) => {
            const resume = this.__getResume(pendente?.totalFaturado);
            pendente["data"] = dataCorrespondente;
            pendente["parcela"] = "Primeira";
            pendente["resto"] = resume.resto;
            pendente["caixas"] = resume.caixas;
            pendente["bonus"] = resume.bonus;

            meta.totalBonusPendente += Number(resume?.bonus);
            meta.totalCaixasPendente += Number(resume?.caixas);
            meta.totalRestoPendente += Number(resume?.bonus);
        });

        const response = {data: pendentesPrimeiraQuinzena, meta}
        return response;
    }

    async getFaturacoesSegundaQuinzena(ano, mes) {
        const faturacoesSegundaQuinzena = await faturacoes_model.findAll({
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
                    where(fn("DAY", col("data_faturacao")), {
                        [Op.between]: [16, 31],
                    }),
                    where(col("forma_pagamento"), "Quinzenal"),
                ],
            },
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [[col("agente.nome"), "ASC"]],
            raw: true,
        });

        return faturacoesSegundaQuinzena;
    }
    async getPendentesSegundaQuinzena(ano, mes) {
        const dataCorrespondente = `${ano}-${mes >= 10 ? mes : "0" + mes}-01`;
        const pendentesSegundaQuinzena = await faturacoes_model.findAll({
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
                    where(fn("DAY", col("data_faturacao")), {
                        [Op.between]: [16, 31],
                    }),
                    where(col("forma_pagamento"), "Quinzenal"),
                    literal(`
        NOT EXISTS (
          SELECT 1
          FROM pagamentos p
          WHERE
            p.agente_id = faturacoes.agente_id
            AND p.parcela = 'Segunda'
            AND p.data_correspondente = '${dataCorrespondente}'
        )
      `),
                ],
            },
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [[col("agente.nome"), "ASC"]],
            raw: true,
        });

        const meta = {
            totalBonusPendente: 0,
            totalCaixasPendente: 0,
            totalRestoPendente: 0,
            total: pendentesSegundaQuinzena.length,
        };
        pendentesSegundaQuinzena.map((pendente) => {
            const resume = this.__getResume(pendente?.totalFaturado);
            pendente["data"] = dataCorrespondente;
            pendente["parcela"] = "Segunda";
            pendente["resto"] = resume.resto;
            pendente["caixas"] = resume.caixas;
            pendente["bonus"] = resume.bonus;

            meta.totalBonusPendente += Number(resume?.bonus);
            meta.totalCaixasPendente += Number(resume?.caixas);
            meta.totalRestoPendente += Number(resume?.bonus);
        });

        const response = {data: pendentesSegundaQuinzena, meta}
        return response;
    }

    async getFaturacoesMensais(ano, mes) {
        const faturacoesMensais = await faturacoes_model.findAll({
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
                    where(col("forma_pagamento"), "Mensal"),
                ],
            },
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [[col("agente.nome"), "ASC"]],
            raw: true,
        });

        return faturacoesMensais;
    }
    async getPendentesMensais(ano, mes) {
        const dataCorrespondente = `${ano}-${mes >= 10 ? mes : "0" + mes}-01`;
        const pendentesMensais = await faturacoes_model.findAll({
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
                    where(col("forma_pagamento"), "Mensal"),
                    literal(`
        NOT EXISTS (
          SELECT 1
          FROM pagamentos p
          WHERE
            p.agente_id = faturacoes.agente_id
            AND p.parcela = 'Única'
            AND p.data_correspondente = '${dataCorrespondente}'
        )
      `),
                ],
            },
            include: [{ model: agent_model, as: "agente", attributes: [] }],
            order: [[col("agente.nome"), "ASC"]],
            raw: true,
        });

        const meta = {
            totalBonusPendente: 0,
            totalCaixasPendente: 0,
            totalRestoPendente: 0,
            total: pendentesMensais.length,
        };
        pendentesMensais.map((pendente) => {
            const resume = this.__getResume(pendente?.totalFaturado);
            pendente["data"] = dataCorrespondente;
            pendente["parcela"] = "Única";
            pendente["resto"] = resume.resto;
            pendente["caixas"] = resume.caixas;
            pendente["bonus"] = resume.bonus;

            meta.totalBonusPendente += Number(resume?.bonus);
            meta.totalCaixasPendente += Number(resume?.caixas);
            meta.totalRestoPendente += Number(resume?.bonus);
        });

        const response = {data: pendentesMensais, meta}
        return response;
    }

    __getResume(totalFaturado) {
        const resumo = {
            bonus: 0.0,
            resto: 0.0,
            caixas: 0,
        };

        if (totalFaturado == 0) {
            return resumo;
        } else if (totalFaturado % 12500 === 0) {
            resumo.caixas = totalFaturado / 25000;
            resumo.bonus = (totalFaturado / 25000) * 1800;
            resumo.resto = 0;
        } else {
            // Pegamos o múltiplo de 12500 menor e mais próximo
            const multiplo = Math.floor(totalFaturado / 12500) * 12500;
            resumo.caixas = multiplo / 25000;
            resumo.bonus = (multiplo / 25000) * 1800;
            resumo.resto = totalFaturado - multiplo;
        }

        return resumo;
    }
}

const PagamentosUtilFunctios = new classPagamentosUtilFunctios();
export default PagamentosUtilFunctios;
