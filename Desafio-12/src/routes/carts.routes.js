import { Router } from "express";
import { getCarts, getCartById, postCart, postProductInCart, deleteAllProductsInCart, deleteProductInCart, putCartById, putProductInCart, purchaseCartById } from "../controllers/carts.controller.js";
import { authorization } from "../middlewares/auth.js";

const cartsRouter = Router();

cartsRouter.get("/", getCarts );
  
cartsRouter.get("/:cId", getCartById );
  
cartsRouter.post('/', postCart );
  
cartsRouter.post("/:cId/product/:pId", authorization('usuario', 'premium'), postProductInCart );
  
cartsRouter.delete('/:cId', authorization('usuario', 'premium'), deleteAllProductsInCart );
  
cartsRouter.delete('/:cId/products/:pId', authorization('usuario', 'premium'), deleteProductInCart );  
  
cartsRouter.put('/:cId', putCartById );
  
cartsRouter.put('/:cId/products/:pId', putProductInCart );

cartsRouter.post("/:cId/purchase",authorization('usuario', 'premium'),purchaseCartById)

export default cartsRouter;

