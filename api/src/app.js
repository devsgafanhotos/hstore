import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import { connectDB } from "./config/postgresqlClient.js";
import errorMiddleware from "./shared/middlewares/error.middleware.js";
import router from "./index.routes.js";

export function app() {
    const app = express();

    app.use(helmet());

    app.use(
        cors({
            origin: env.app_url,
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        })
    );

    app.use(cookieParser());
    
    app.use(express.json());

    app.use(router);
    app.use(errorMiddleware);


    connectDB();

    return app;
}
