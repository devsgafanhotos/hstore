import { getModels } from "../../config/postgresqlClient.js";
const { pagamentos: pagamentos_model } = getModels();

class classPagamentosServices {
    async cadastrar(pagamento) {
        return {
            success: true,
            message: "Cadastro feito com sucesso!",
            pagamento: pagamento_criado,
        };
    }

    async getPagamento(id_pagamento, data) {
        return {
            success: true,
            data: "pagamento_encontrado",
        };
    }
}

const PagamentoServices = new classPagamentosServices();
export default PagamentoServices;
