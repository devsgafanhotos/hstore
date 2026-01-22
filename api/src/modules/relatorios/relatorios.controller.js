import { hoje } from "../../shared/utils/date.js";
import RelatoriosServices from "./relatorios.service.js";

class ClassRelatoriosControllers {
    getRelatorio = async (req, res, next) => {
        try {
            const {
                data = hoje,
                tipo = "Diario",
                nome_agente = null,
                forma_pagamento = null,
            } = req.query;

            const response = await RelatoriosServices.getRelatorio(
                {
                    data,
                    tipo,
                    nome_agente,
                    forma_pagamento,
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

const RelatoriosControllers = new ClassRelatoriosControllers();

export default RelatoriosControllers;
