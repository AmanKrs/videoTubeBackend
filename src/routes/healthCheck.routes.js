import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controller.js";

const router = Router();

router.route("/").get(healthCheck);

//another way of writing
//router.get("/", healthCheck);

export default router;
