import { getModels } from "../../config/postgresqlClient.js";
const { faturacoes: faturacoes_model } = getModels();

class classFaturacoesServices {
    async cadastrar(faturacao) {
        return {
            success: true,
            message: "Cadastro feito com sucesso!",
            faturacao: faturacao_criado,
        };
    }

    async getTipoFaturação(id_faturacao, data) {
        return {
            success: true,
            data: "faturacao_encontrado",
        };
    }
}

const FaturacoesServices = new classFaturacoesServices();
export default FaturacoesServices;
