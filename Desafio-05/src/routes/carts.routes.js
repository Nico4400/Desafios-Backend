import { Router } from "express";
import { cartModel } from "../dao/models/cart.model.js";

// import CartManager from "../CartManager.js";
// const cartManager = new CartManager('./src/Carts.json');

const cartsRouter = Router();

cartsRouter.get('/', async (req, res) => {
    try {
      const carts = await cartModel.find();
      res.send({carts});
    } catch (error) {
      console.error(error);
      res.status(400).json({message: `No podemos devolver los carritos - ${error}`});
    }
});
  
cartsRouter.get('/:cId', async (req, res) => {
    const { uId } = req.params;
    try {
        const cart = await cartModel.findOne({_id: cId});
        res.send({cart});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: `No podemos devolver el carrito - Error: ${error}`});
    }
});

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = req.body;
        await cartModel.create(newCart);
        res.status(201).json({message: 'Carrito creado exitosamente'});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: `No se pudo crear el carrito - ${error}`});
    }
});


// cartsRouter.get('/', async (req, res) => {
//     const carts = await cartManager.getCarts();
//     res.send(carts);
// });

// cartsRouter.post('/', async (req, res) => {
//     cartAdded = await cartManager.addCarts();
//     if(!cartAdded) {
//         return res.status(400).send({message: 'error carrito no agregado'});
//     }
//     res.send({message: 'Carrito agregado'});
// });

// cartsRouter.get('/:cId', async (req, res) => {
//     const {cId} = req.params;
//     const cartById = await cartManager.getCartsId(cId);
//     if(!cartById) {
//         return res.status(400).send({message: 'error carrito encontrado'});
//     }
//     res.send(cartById);
// });

// cartsRouter.post('/:cId/product/:pId', async (req, res) => {
//     const { cId, pId } = req.params;
//     const productAddedToCarts = await cartManager.addProductToCart(pId, cId);
//     if(!productAddedToCarts){
//         return res.status(400).send({message: 'error, producto no agregado'});
//     }
//     res.send({message: 'Producto agregado'});
// });

export default cartsRouter;

