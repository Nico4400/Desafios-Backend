import ProductManager from "../dao/managers/ProductManager.js";
import CartManager from "../dao/managers/CartManager.js";
import TicketManager from "../dao/managers/TicketManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();
const ticketManager = new TicketManager();


export const getHome = async (req, res) => {
    const {limit} = req.query;
    const products = await productManager.getProducts(limit);
    return res.render('home', { products });
};

export const getRealTimeProducts = async (req, res) => {    
    try {
        const products = await productManager.getProducts();
        return res.render('realTimeProducts', { title: "RealTime Products", data: products.rdo });     
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'products not found'});
    }
};

export const postRealTimeProducts = async (req, res) => {
    try {
        const product = req.body;
        const products = await productManager.addProduct(product);
        return res.render('realTimeProducts', { title: "RealTime Products", data: products.rdo });        
    } catch (error) {
        res.status(400).json({ message: 'Hubo un error al procesar la solicitud.' });
    }
};

export const getProducts = async (req, res) => {
    const user = req.user;
    const { page } = req.query;
    const products = await productManager.getProducts(10, page);
    res.render('products', {products, user});
};

export const getCartById = async (req, res) => {
    const { cId } = req.params; 
    const cart = await cartManager.getProductsCartById(cId);
    console.log(cId, cart);
    res.render('cart', { cart, cId });
};

export const getTicketById = async (req, res) => {
    const { tId } = req.params; 
    const ticket = await ticketManager.getTicketById(tId);
    console.log(ticket);
    res.render('ticket', { ticket, tId });
};  
  
export const getChat = async (req, res) => {
    res.render('chat')
};

// Vistas para acceso
export const getIndex = (req, res) => {
    const user = req.user;
    console.log(user)
    res.render('index', user.rdo);
};

export const getLogin = (req, res) => {
    res.render('login');
};

export const getRegister = (req, res) => {
    res.render('register');
};

export const getRestorePassword = (req, res) => {
    res.render('restore-password');
};

export const getFailLogin = (req, res) => {
    res.render('faillogin');
};

export const getFailRegister = (req, res) => {
    res.render('failregister');
};