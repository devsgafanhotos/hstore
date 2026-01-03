import { Router } from "express";
import userRouter from "./modules/user/user.routes.js";
import agentRouter from "./modules/agentes/agentes.routes.js";

const router = Router();

router.use("/user", userRouter);
router.use("/agent", agentRouter);

export default router;
