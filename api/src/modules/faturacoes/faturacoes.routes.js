import AuthMiddleware from "../../shared/middlewares/auth.middleware.js";
import FaturacoesControllers from "./faturacoes.controller.js";
import { Router } from "express";
const faturacaoRouter = Router();

faturacaoRouter.post(
    "/cadastrar",
    AuthMiddleware.authanticateAccess,
    AuthMiddleware.verifyRole(["Admin", "Normal"]),
    FaturacoesControllers.cadastrar
);

faturacaoRouter.get(
    "/faturacoes",
    AuthMiddleware.authanticateAccess,
    AuthMiddleware.verifyRole(["Admin", "Normal"]),
    FaturacoesControllers.getFaturacoes
);

export default faturacaoRouter;
