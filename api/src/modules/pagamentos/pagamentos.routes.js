import AuthMiddleware from "../../shared/middlewares/auth.middleware.js";
import PagamentosControllers from "./pagamentos.controller.js";
import { Router } from "express";
const pagamentoRouter = Router();

pagamentoRouter.post(
    "/cadastrar",
    AuthMiddleware.authanticateAccess,
    AuthMiddleware.verifyRole(["Admin", "Normal"]),
    PagamentosControllers.cadastrar
);

pagamentoRouter.get(
    "/pagamentos",
    //AuthMiddleware.authanticateAccess,
    //AuthMiddleware.verifyRole(["Admin", "Normal"]),
    PagamentosControllers.getPagamentoss
);

export default pagamentoRouter;
