import { Router } from "express";
import { getLogger } from "../controllers/logger.controller.js";

const loggerRouter = Router()

loggerRouter.get("/", getLogger)

export default loggerRouter