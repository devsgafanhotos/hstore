import AuthMiddleware from "../../shared/middlewares/auth.middleware.js";
import AgentsControllers from "./agentes.controller.js";

import { Router } from "express";
const agentRouter = Router();

agentRouter.post(
    "/cadastrar",
    AuthMiddleware.authanticateAccess,
    AgentsControllers.cadastrar
);

agentRouter.get(
    "/agentes",  //?id=Number
    AuthMiddleware.authanticateAccess,
    AgentsControllers.getAgentes,
);
export default agentRouter;
