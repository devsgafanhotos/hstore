import PagamentosServices from "./pagamentos.service.js";

class ClassPagamentosControllers {
    registrar = async (req, res, next) => {
        try {
            const pagamentosPendente = req.body;

            const response = await PagamentosServices.registrar({
                ...pagamentosPendente,
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

    getPagamentoss = async (req, res, next) => {
        try {
            const {
                data = new Date(),
                nome_agente = null,
                id_pagamento = null,
                bonus = null,
                parcela = "Única",
                estado = "Pendentes",
                limit,
            } = req.query;

            const response = await PagamentosServices.getPagamentos(
                data,
                estado,
                {
                    nome_agente,
                    id_pagamento,
                    bonus,
                    parcela,
                    limit: limit,
                }
            );

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

const PagamentosControllers = new ClassPagamentosControllers();

export default PagamentosControllers;
