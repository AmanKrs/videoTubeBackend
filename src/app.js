import express from "express"; // uses if we use type modelue.js
// const express = require("express"); // uses when type is common.js
import cors from "cors";

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

//import routes
import healthCheckRouter from "./routes/healthCheck.routes.js";


//routes

 app.use("/api/v1/healthcheck", healthCheckRouter);

export { app }; // uses if we use type modelue.js
// module.exports = app; // uses when type is common.js
