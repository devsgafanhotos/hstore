import Sequelize from "sequelize";
import initModels from "../models/init-models.js";
import env from "./env.js";

const sequelize = new Sequelize(env.database_url, {
    dialect: "mysql",
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false, // ignora certificado autoassinado
        },
    },
    logging: false, // opcional
});

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("📦 Conectado ao MySQL com sucesso.");
    } catch (error) {
        console.error("❌ Erro na conexão com o banco:", error.message);
        console.log(error);
        process.exit(1);
    }
}

export function getModels() {
    return initModels(sequelize);
}
