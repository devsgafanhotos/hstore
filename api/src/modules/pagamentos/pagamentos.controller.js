import PagamentosServices from "./pagamentos.service.js";

class ClassPagamentosControllers {
    cadastrar = async (req, res, next) => {
        try {
            const pagamento = req.body;

            const response = await PagamentosServices.cadastrar({
                ...pagamento,
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

const PagamentosControllers = new ClassPagamentosControllers();

export default PagamentosControllers;
