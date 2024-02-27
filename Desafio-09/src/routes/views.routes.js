import { Router } from "express";
import { checkAuth, checkExistingUser } from '../middlewares/auth.js'
import { getHome, getRealTimeProducts, postRealTimeProducts, getProducts, getCartById, getChat, getIndex, getLogin, getRegister, getRestorePassword, getFailLogin, getFailRegister } from "../controllers/views.controller.js";


const viewsRouters = Router();


viewsRouters.get('/home', getHome );

viewsRouters.get('/realtimeproducts', getRealTimeProducts );

viewsRouters.post('/realtimeproducts', postRealTimeProducts );

viewsRouters.get('/products', getProducts );

viewsRouters.get('/carts/:cId', checkAuth, getCartById );
  
viewsRouters.get('/chat', getChat );

// Vistas para acceso
viewsRouters.get('/', checkAuth, getIndex);

viewsRouters.get('/login', checkExistingUser, getLogin );

viewsRouters.get('/register', checkExistingUser, getRegister );

viewsRouters.get('/restore-password', checkExistingUser, getRestorePassword );

viewsRouters.get('/faillogin', getFailLogin );

viewsRouters.get('/failregister', getFailRegister );

export default viewsRouters;