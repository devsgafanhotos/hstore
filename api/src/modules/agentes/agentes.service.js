import { col } from "sequelize";
import { getModels } from "../../config/postgresqlClient.js";
const { agentes: agents_model, usuarios: user_model } = getModels();

class classAgentServices {
    async cadastrar(agente) {
        const responseAgenteID = await this.verifyAgentAgenteID(
            agente.id_agente
        );

        if (responseAgenteID.success) {
            return {
                success: false,
                status: 409,
                message: "Id de agente indisponível!",
            };
        }

        const responseTelefone = await this.verifyAgentTelefone(
            agente.telefone
        );

        if (responseTelefone.success) {
            return {
                success: false,
                status: 409,
                message: "Telefone indisponível!",
            };
        }

        const agente_criado = await agents_model.create({
            id_agente: agente.id_agente,
            telefone: agente.telefone,
            nome: agente.nome,
            usuario_id: agente.usuario_id,
        });

        return {
            success: true,
            message: "Agente cadastrado com sucesso!",
            data: {
                id: agente_criado.id_agente,
                nome: agente_criado.nome,
                telefone: agente_criado.telefone,
            },
        };
    }

    async getAgentes(id_agente) {
        const idCondition = id_agente && { id_agente: id_agente };

        let agentes_encontrados = await agents_model.findAll({
            attributes: [
                ["id_agente", "id"],
                "nome",
                "telefone",
                ["data_criacao", "dataCadastro"],
                [col("usuario.nome"), "cadastradoPor"],
            ],
            where: idCondition,
            include: [{ model: user_model, as: "usuario", attributes: [] }],
        });

        if (!agentes_encontrados) {
            return {
                success: false,
                data: [],
            };
        }

        return {
            success: true,
            data: agentes_encontrados,
        };
    }

    async verifyAgentTelefone(telefone) {
        let agente_encontrado = await agents_model.findOne({
            where: {
                telefone: telefone,
            },
        });

        if (!agente_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: agente_encontrado,
        };
    }

    async verifyAgentAgenteID(id_agente) {
        let agente_encontrado = await agents_model.findOne({
            where: {
                id_agente: id_agente,
            },
        });

        if (!agente_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: agente_encontrado,
        };
    }
}

const AgentServices = new classAgentServices();
export default AgentServices;
