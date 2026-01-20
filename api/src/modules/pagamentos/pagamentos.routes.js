import AuthMiddleware from "../../shared/middlewares/auth.middleware.js";
import PagamentosControllers from "./pagamentos.controller.js";
import { Router } from "express";
const pagamentoRouter = Router();

pagamentoRouter.post(
    "/registrar",
    AuthMiddleware.authanticateAccess,
    AuthMiddleware.verifyRole(["Admin", "Normal"]),
    PagamentosControllers.registrar
);

pagamentoRouter.get(
    "/pagamentos",
    AuthMiddleware.authanticateAccess,
    AuthMiddleware.verifyRole(["Admin", "Normal"]),
    PagamentosControllers.getPagamentoss
);

export default pagamentoRouter;
