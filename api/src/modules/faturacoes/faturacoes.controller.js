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
                dataInicio = new Date(0),
                dataFim = new Date(),
                agente_id = null,
                id_faturacao = null,
                forma_pagamento = null,
                tipo_faturacao = null
            } = req.query;

            const response = await FaturacoesServices.getFaturacoes(
                dataInicio,
                dataFim,
                {
                    agente_id,
                    id_faturacao,
                    forma_pagamento,
                    tipo_faturacao
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
}

const FaturacoesControllers = new ClassFaturacoesControllers();

export default FaturacoesControllers;
