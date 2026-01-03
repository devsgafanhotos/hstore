import AuthMiddleware from "../../shared/middlewares/auth.middleware.js";
import FaturacoesControllers from "./faturacoes.controller.js";
import { Router } from "express";
const faturacaoRouter = Router();

faturacaoRouter.post(
    "/cadastrar",
    AuthMiddleware.authanticateAccess,
    FaturacoesControllers.cadastrar
);

export default faturacaoRouter;
