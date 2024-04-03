import { Router } from "express";
import { authorization } from "../middlewares/auth.js";
import { getProducts, getProductById, postProduct, putProduct, deleteProduct } from "../controllers/products.controller.js";


const productsRouter = Router();

productsRouter.get("/", getProducts );

productsRouter.get("/:pId", getProductById );

productsRouter.post('/', authorization('admin', 'premium'), postProduct );

productsRouter.put('/:pId', authorization('admin', 'premium'), putProduct );

productsRouter.delete('/:pId', authorization('admin', 'premium'), deleteProduct );

export default productsRouter;