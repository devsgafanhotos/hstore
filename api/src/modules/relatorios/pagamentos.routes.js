import AuthMiddleware from "../../shared/middlewares/auth.middleware.js";
import RelatoriossControllers from "./relatorios.controller.js";
import { Router } from "express";
const relatoriosRouter = Router();

relatoriosRouter.post(
    "/cadastrar",
    AuthMiddleware.authanticateAccess,
    RelatoriossControllers.cadastrar
);

export default relatoriosRouter;
