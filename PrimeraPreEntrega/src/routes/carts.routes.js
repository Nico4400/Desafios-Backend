import { Router } from "express";

import CartManager from "../CartManager.js";
const cartManager = new CartManager('./src/Carts.json');

const cartsRouter = Router();

cartsRouter.get('/', async (req, res) => {
    const carts = await cartManager.getCarts();
    res.send(carts);
});

cartsRouter.post('/', async (req, res) => {
    cartAdded = await cartManager.addCarts();
    if(!cartAdded) {
        return res.status(400).send({message: 'error carrito no agregado'});
    }
    res.send({message: 'Carrito agregado'});
});

cartsRouter.get('/:cId', async (req, res) => {
    const {cId} = req.params;
    const cartById = await cartManager.getCartsId(cId);
    if(!cartById) {
        return res.status(400).send({message: 'error carrito encontrado'});
    }
    res.send(cartById);
});

cartsRouter.post('/:cId/product/:pId', async (req, res) => {
    const { cId, pId } = req.params;
    const productAddedToCarts = await cartManager.addProductToCart(pId, cId);
    if(!productAddedToCarts){
        return res.status(400).send({message: 'error, producto no agregado'});
    }
    res.send({message: 'Producto agregado'});
});

export default cartsRouter;

