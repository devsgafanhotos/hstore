import Sequelize from "sequelize";
export default function pagamentos(sequelize, DataTypes) {
    return sequelize.define(
        "pagamentos",
        {
            id_pagamento: {
                autoIncrement: true,
                autoIncrementIdentity: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            data_pagamento: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            data_correspondente: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            parcela: {
                type: DataTypes.ENUM("Primeira", "Segunda", "Unica"),
                allowNull: false,
                defaultValue: "Unica",
            },
            bonus: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            resto: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0.0,
            },
            agente_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "agentes",
                    key: "id_agente",
                },
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
            tableName: "pagamentos",
            schema: "public",
            timestamps: false,
            indexes: [
                {
                    name: "pagamentos_pkey",
                    unique: true,
                    fields: [{ name: "id_pagamento" }],
                },
            ],
        }
    );
}
