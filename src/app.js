import express from "express"; // uses if we use type modelue.js
// const express = require("express"); // uses when type is common.js
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//common middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import routes

// import healthCheckRouter from "./routes/healthCheck.routes.js";
import routeApi from "./routeApi.js";

//routes
app.use("/", routeApi);
// app.use("/api/v1/healthcheck", healthCheckRouter);

//importing Error handler middleware
import { errorHandler } from "./middlewares/error.middleware.js";
// app.use(errorHandler);
export { app }; // uses if we use type modelue.js
// module.exports = app; // uses when type is common.js
