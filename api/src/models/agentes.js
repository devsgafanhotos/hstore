import Sequelize from "sequelize";
export default function agentes(sequelize, DataTypes) {
    return sequelize.define(
        "agentes",
        {
            id_agente: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            telefone: {
                type: DataTypes.STRING(45),
                allowNull: false,
                unique: "agentes_telefone_key",
            },
            nome: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            data_criacao: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            estado: {
                type: DataTypes.STRING(45),
                allowNull: false,
                defaultValue: "Ativo",
            },
            ultima_actualizacao: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "usuarios",
                    key: "id_usuario",
                },
            },
        },
        {
            sequelize,
            tableName: "agentes",
            schema: "public",
            timestamps: false,
            indexes: [
                {
                    name: "agentes_pkey",
                    unique: true,
                    fields: [{ name: "id_agente" }],
                },
                {
                    name: "agentes_telefone_key",
                    unique: true,
                    fields: [{ name: "telefone" }],
                },
            ],
        }
    );
}
