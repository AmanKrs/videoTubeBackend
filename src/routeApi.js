import { Router } from "express";
const routes = Router();

import healthCheckRouter from "./routes/healthCheck.routes.js";
import userRouter from "./routes/userRegister.routes.js";
routes.use("/api/v1/healthcheck", healthCheckRouter);
routes.use("/api/v1/user", userRouter);

export default routes;
