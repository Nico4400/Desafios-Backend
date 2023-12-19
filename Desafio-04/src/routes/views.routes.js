import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager('./src/Products.json');

const viewsRouters = Router();

viewsRouters.get('/', (req, res) => {
    res.render('index');
});

viewsRouters.get('/home', async (req, res) => {
    const {limit} = req.query;
    const products = await productManager.getProducts(limit);
    if(limit){
        return res.render('home', { products });
    }
    return res.render('home', { products });
});

viewsRouters.get('/realtimeproducts', async (req, res) => {
    const {limit} = req.query;
    const products = await productManager.getProducts(limit);
    if(limit){
        return res.render('realTimeProducts', { products });
    }
    return res.render('realTimeProducts', { products });
});

viewsRouters.post('/realtimeproducts', async (req, res) => {
    const product = req.body;
    const products = await productManager.addProduct(product);
    return res.render('realTimeProducts', { products });
});

export default viewsRouters;