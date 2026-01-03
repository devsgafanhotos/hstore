import Sequelize from "sequelize";
export default function faturacoes(sequelize, DataTypes) {
    return sequelize.define(
        "faturacoes",
        {
            id_facturacao: {
                autoIncrement: true,
                autoIncrementIdentity: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            valor: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            data_faturacao: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            ultima_actualizacao: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            estado: {
                type: DataTypes.ENUM("Pendente", "Pago"),
                allowNull: false,
                defaultValue: "Pago",
            },
            tipo_faturacao: {
                type: DataTypes.ENUM("Fisico", "Eletronico"),
                allowNull: false,
            },
            forma_pagamento: {
                type: DataTypes.ENUM("Quinzenal", "Mensal"),
                allowNull: false,
                defaultValue: "Mensal",
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
            tableName: "faturacoes",
            schema: "public",
            timestamps: false,
            indexes: [
                {
                    name: "faturacoes_pkey",
                    unique: true,
                    fields: [{ name: "id_facturacao" }],
                },
            ],
        }
    );
}
