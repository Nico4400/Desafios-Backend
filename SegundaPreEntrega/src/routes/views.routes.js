import { Router } from "express";
import ProductManager from "../dao/managers/ProductManager.js";

const viewsRouters = Router();

const productManager = new ProductManager();

viewsRouters.get('/', (req, res) => {
    res.render('index');
});

viewsRouters.get('/home', async (req, res) => {
    const {limit} = req.query;
    const products = await productManager.getProducts(limit);
    if(limit) {
        return res.render('home', { products });
    }
    return res.render('home', { products });
});

viewsRouters.get('/realtimeproducts', async (req, res) => {    
    try {
        const products = await productManager.getProducts();
        res.status(200).json({products});   
        return res.render('realTimeProducts', { title: "RealTime Products", data: products.rdo });     
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'products not fopund'});
    }
});

viewsRouters.post('/realtimeproducts', async (req, res) => {
    try {
        const product = req.body;
        const products = await productManager.addProduct(product);
        return res.render('realTimeProducts', { title: "RealTime Products", data: products.rdo });        
    } catch (error) {
        res.status(400).json({message: err});
    }
});

viewsRouters.get('/products', async (req, res) => {
    const { page } = req.query;
    const products = await productManager.getProducts(10, page);
    res.render('products', products);
});
  
viewsRouters.get('/chat', async (req, res) => {
    res.render('chat')
})

export default viewsRouters;