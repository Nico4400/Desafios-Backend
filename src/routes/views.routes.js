import { Router } from "express";
import { checkAuth, checkExistingUser, authorization } from '../middlewares/auth.js'
import { getHome, getRealTimeProducts, postRealTimeProducts, getProducts, getCartById, getTicketById, getChat, getIndex, getLogin, getRegister, getRestorePassword, getUpdatePassword, getFailLogin, getFailRegister, getUserAdmin } from "../controllers/views.controller.js";
import { getCurrent } from "../controllers/sessions.controller.js";

const viewsRouters = Router();


viewsRouters.get('/home', getHome );

viewsRouters.get('/realtimeproducts', getRealTimeProducts );

viewsRouters.post('/realtimeproducts', postRealTimeProducts );

viewsRouters.get('/products', getProducts );

viewsRouters.get('/carts/:cId', checkAuth, getCartById );
  
viewsRouters.get('/ticket/:tId', checkAuth, getTicketById );

viewsRouters.get('/chat',authorization('user', 'premium'), getChat );

viewsRouters.get("/current", getCurrent);

// Vistas para acceso
viewsRouters.get('/', checkAuth, getIndex);

viewsRouters.get('/login', checkExistingUser, getLogin );

viewsRouters.get('/register', checkExistingUser, getRegister );

viewsRouters.get('/restore-password', checkExistingUser, getRestorePassword );

viewsRouters.get('/update-password', checkExistingUser, getUpdatePassword);

viewsRouters.get('/faillogin', getFailLogin );

viewsRouters.get('/failregister', getFailRegister );

viewsRouters.get('/userAdmin', checkAuth, authorization('admin'), getUserAdmin);

export default viewsRouters;