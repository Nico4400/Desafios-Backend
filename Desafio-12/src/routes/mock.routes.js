import { Router } from "express";
import { PostMockProducts } from "../controllers/mock.controller.js";
import { authorization } from "../middlewares/auth.js";


const mockRouter = Router()

mockRouter.get('/mockingProducts', authorization('admin'), PostMockProducts)

export default mockRouter