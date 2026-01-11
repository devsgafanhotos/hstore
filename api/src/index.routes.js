import { Router } from "express";
import userRouter from "./modules/user/user.routes.js";
import agentRouter from "./modules/agentes/agentes.routes.js";
import faturacaoRouter from "./modules/faturacoes/faturacoes.routes.js";

const router = Router();

router.use("/user", userRouter);
router.use("/agent", agentRouter);
router.use("/fat", faturacaoRouter);

export default router;
