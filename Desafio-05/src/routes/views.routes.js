import { Router } from "express";
// import ProductManager from "../dao/ProductManager.js";
import { productModel } from "../dao/models/product.model.js";

// const productManager = new ProductManager('./src/Products.json');

const viewsRouters = Router();

viewsRouters.get('/', (req, res) => {
    res.render('index');
});

// viewsRouters.get('/home', async (req, res) => {
//     const {limit} = req.query;
//     const products = await productManager.getProducts(limit);
//     if(limit){
//         return res.render('home', { products });
//     }
//     return res.render('home', { products });
// });

viewsRouters.get('/realtimeproducts', async (req, res) => {    
    try {
        const products = await productModel.find();
        res.status(200).json({products});   
        return res.render('realTimeProducts', { products });     
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'users not fopund'});
    }
});

viewsRouters.post('/realtimeproducts', async (req, res) => {
    const product = req.body;
    const products = await productModel.create(product);
    return res.render('realTimeProducts', { products });
});

viewsRouters.get('/chat', async (req, res) => {
    res.render('chat')
})

export default viewsRouters;