import { Router } from "express";
import { getCarts, getCartById, postCart, postProductInCart, deleteAllCartById, deleteProductInCart, putCartById, putProductInCart } from "../controllers/carts.controller.js";

const cartsRouter = Router();

cartsRouter.get("/", getCarts );
  
cartsRouter.get("/:cId", getCartById );
  
cartsRouter.post('/', postCart );
  
cartsRouter.post("/:cId/product/:pId", postProductInCart );
  
cartsRouter.delete('/:cId', deleteAllCartById );
  
cartsRouter.delete('/:cId/products/:pId', deleteProductInCart );  
  
cartsRouter.put('/:cId', putCartById );
  
cartsRouter.put('/:cId/products/:pId', putProductInCart );

export default cartsRouter;

