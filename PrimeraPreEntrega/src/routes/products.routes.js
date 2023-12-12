import { Router } from "express";

import ProductManager from "../ProductManager.js";
const productManager = new ProductManager('./src/Products.json');

const productsRoutes = Router();

productsRoutes.post('/', async (req, res) => {
    const product = req.body;
    const products = await productManager.addProduct(product);
    res.send({status: 'ok', message: 'Producto Creado', product});
});

productsRoutes.get('/', async (req, res) => {
    const {limit} = req.query;
    const products = await productManager.getProducts(limit);
    if(limit){
        return res.send(products);
    }
    return res.send(products);
});

productsRoutes.put('/:pId', async (req, res) => {
    const {pId, productToUpdate} = req.params;
    const prod = await productManager.getProductById(pId);    
    if(!prod){
        res.send({error: 'producto no Encontrado'});
    }
    const product = await productManager.updateProduct(pId, productToUpdate);    
    return res.send({prod})
    
});

productsRoutes.get('/:pId', async (req, res) => {
    const {pId} = req.params;
    try {
        const product = await productManager.getProductById(pId);
        res.send(product);        
    } catch (error) {
        res.status(404).send({message: 'producto no encontrado'});
    }

});

productsRoutes.delete('/:pId', async (req,res) => {
    const {pId} = req.params;
    const prod = await productManager.deleteProduct(pId);
    if(!prod){
        return res.status(400).send({message: 'error, producto no Eliminado'});
    }
    res.send({message: 'Producto Eliminado'});    
});

export default productsRoutes;