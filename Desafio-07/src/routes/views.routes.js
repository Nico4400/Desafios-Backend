import { Router } from "express";
import ProductManager from "../dao/managers/ProductManager.js";
import { checkAuth, checkExistingUser } from '../middlewares/auth.js'

const viewsRouters = Router();

const productManager = new ProductManager();

// viewsRouters.get('/', (req, res) => {
//     res.render('index');
// });

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
        // res.status(200).json({products});   
        return res.render('realTimeProducts', { title: "RealTime Products", data: products.rdo });     
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'products not found'});
    }
});

viewsRouters.post('/realtimeproducts', async (req, res) => {
    try {
        const product = req.body;
        const products = await productManager.addProduct(product);
        return res.render('realTimeProducts', { title: "RealTime Products", data: products.rdo });        
    } catch (error) {
        res.status(400).json({ message: 'Hubo un error al procesar la solicitud.' });
    }
});

viewsRouters.get('/products', async (req, res) => {
    const { page } = req.query;
    const products = await productManager.getProducts(10, page);
    res.render('products', products);
});
  
viewsRouters.get('/chat', async (req, res) => {
    res.render('chat')
});

// Vistas para acceso
viewsRouters.get('/', checkAuth, (req, res) => {
    const {user} = req.session;
    res.render('index', user.rdo);
});

viewsRouters.get('/login', checkExistingUser, (req, res) => {
    res.render('login');
});

viewsRouters.get('/register', checkExistingUser, (req, res) => {
    res.render('register');
});

viewsRouters.get('/restore-password', checkExistingUser, (req, res) => {
    res.render('restore-password');
});

viewsRouters.get('/faillogin', (req, res) => {
    res.render('faillogin');
});
viewsRouters.get('/failregister', (req, res) => {
    res.render('failregister');
});

export default viewsRouters;