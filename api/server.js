import { app } from "./src/app.js";
import env from "./src/config/env.js";

const server = app()

server.listen(env.port, () => {
    console.log(`🚀 Servidor rodando na porta ${env.port}`);
});