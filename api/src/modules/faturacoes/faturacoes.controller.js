import { amanha, hoje, ontem } from "../../shared/utils/date.js";
import FaturacoesServices from "./faturacoes.service.js";

class ClassFaturacoesControllers {
    cadastrar = async (req, res, next) => {
        try {
            const faturacao = req.body;

            const response = await FaturacoesServices.cadastrar({
                ...faturacao,
                usuario_id: req.user.id,
            });

            // Em caso de insucesso
            if (!response.success) {
                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(response.status).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            next(error);
        }
    };

    getFaturacoes = async (req, res, next) => {
        try {
            const {
                dataInicio = ontem,
                dataFim = amanha,
                nome_agente = null,
                id_faturacao = null,
                forma_pagamento = null,
                tipo_faturacao = null,
                limit,
            } = req.query;

            const response = await FaturacoesServices.getFaturacoes(
                dataInicio,
                dataFim,
                {
                    nome_agente,
                    id_faturacao,
                    forma_pagamento,
                    tipo_faturacao,
                    limit: limit,
                }
            );

            // Em caso de insucesso
            if (!response.success) {
                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(response.status).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            next(error);
        }
    };

    getFormaPagamento = async (req, res, next) => {
        try {
            const { data = new Date(), nome_agente } = req.query;
            if (!nome_agente) {
                throw new Error("Informe o nome do agente!");
            }

            const response = await FaturacoesServices.getFormaPagamento(
                nome_agente,
                data
            );

            // Em caso de insucesso
            if (!response.success) {
                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(response.status).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            next(error);
        }
    };
}

const FaturacoesControllers = new ClassFaturacoesControllers();

export default FaturacoesControllers;
