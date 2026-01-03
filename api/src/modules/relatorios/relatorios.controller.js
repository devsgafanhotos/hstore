import RelatoriosServices from "./relatorios.service.js";

class ClassRelatoriosControllers {
    cadastrar = async (req, res, next) => {
        try {
            const relatorio = req.body;

            const response = await RelatoriosServices.cadastrar({
                ...relatorio,
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
}

const RelatoriosControllers = new ClassRelatoriosControllers();

export default RelatoriosControllers;
