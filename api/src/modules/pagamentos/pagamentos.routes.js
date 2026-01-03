import AuthMiddleware from "../../shared/middlewares/auth.middleware.js";
import PagamentosControllers from "./pagamentos.controller.js";
import { Router } from "express";
const pagamentoRouter = Router();

pagamentoRouter.post(
    "/cadastrar",
    AuthMiddleware.authanticateAccess,
    PagamentosControllers.cadastrar
);

export default pagamentoRouter;
