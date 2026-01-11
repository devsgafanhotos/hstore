import AgentsServices from "./agentes.service.js";

class ClassAgentsControllers {
    cadastrar = async (req, res, next) => {
        try {
            const agente = req.body;

            const response = await AgentsServices.cadastrar({
                ...agente,
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

    getAgentes = async (req, res, next) => {
        try {
            const { id } = req.query;

            const response = await AgentsServices.getAgentes(id);

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

const AgentsControllers = new ClassAgentsControllers();

export default AgentsControllers;
