import AuthMiddleware from "../../shared/middlewares/auth.middleware.js";
import RelatoriossControllers from "./relatorios.controller.js";
import { Router } from "express";
const relatoriosRouter = Router();

relatoriosRouter.get(
    "/relatorio",
    AuthMiddleware.authanticateAccess,
    AuthMiddleware.verifyRole(["Admin", "Normal"]),
    RelatoriossControllers.getRelatorio
);

export default relatoriosRouter;
