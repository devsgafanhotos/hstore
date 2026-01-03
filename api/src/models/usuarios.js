import Sequelize from "sequelize";
export default function usuarios(sequelize, DataTypes) {
    return sequelize.define(
        "usuarios",
        {
            id_usuario: {
                autoIncrement: true,
                autoIncrementIdentity: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            nome: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            telefone: {
                type: DataTypes.STRING(45),
                allowNull: false,
                unique: "usuarios_telefone_key",
            },
            email: {
                type: DataTypes.STRING(45),
                allowNull: false,
                unique: "usuarios_email_key",
            },
            role: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            senha: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            data_criacao: {
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
                type: DataTypes.STRING(45),
                allowNull: false,
                defaultValue: "Ativo",
            },
        },
        {
            sequelize,
            tableName: "usuarios",
            schema: "public",
            timestamps: false,
            indexes: [
                {
                    name: "usuarios_email_key",
                    unique: true,
                    fields: [{ name: "email" }],
                },
                {
                    name: "usuarios_pkey",
                    unique: true,
                    fields: [{ name: "id_usuario" }],
                },
                {
                    name: "usuarios_telefone_key",
                    unique: true,
                    fields: [{ name: "telefone" }],
                },
            ],
        }
    );
}
