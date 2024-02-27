import { Router } from "express";
import { getProducts, getProductById, postProduct, putProduct, deleteProduct } from "../controllers/products.controller.js";


const productsRouter = Router();

productsRouter.get("/", getProducts );

productsRouter.get("/:pId", getProductById );

productsRouter.post('/', postProduct );

productsRouter.put('/:pId', putProduct );

productsRouter.delete('/:pId', deleteProduct );

export default productsRouter;