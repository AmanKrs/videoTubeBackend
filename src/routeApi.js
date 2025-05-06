import { Router } from "express";
const routes = Router();

import healthCheckRouter from "./routes/healthCheck.routes.js";

routes.use("/api/v1/healthcheck", healthCheckRouter);

export default routes;
