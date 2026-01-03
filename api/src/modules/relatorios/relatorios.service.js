import { getModels } from "../../config/postgresqlClient.js";
const { pagamentos: pagamentos_model } = getModels();
const { agentes: agente_model } = getModels();
const { faturacoes: faturacao_model } = getModels();

class classRelatoriosServices {
    async getTipoFaturação() {
        return {
            success: true,
            data: "lol",
        };
    }
}

const RelatoriosServices = new classRelatoriosServices();
export default RelatoriosServices;
