import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import viewsRouters from './routes/views.routes.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import chatsRouter from './routes/chats.routes.js';

import ProductManager from './dao/managers/ProductManager.js';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
});

app.engine('handlebars', hbs.engine);
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

mongoose.connect('mongodb+srv://nicofernandezcastillo:ZGbu27XHwKxE0MJR@cluster0.y9gfodj.mongodb.net/ecommerce');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chats', chatsRouter)
app.use('/', viewsRouters);

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

const productManager = new ProductManager();

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    
    socket.on('message', data => {
        console.log(data);
        // Para ver los productos cuando se conecta el cliente
        emitProductUpdate();
    });

    // Para ver cómo funciona
    socket.emit('recibe_uno', 'Esto lo recibe uno solo');
    socket.broadcast.emit('reciben_todos_menos_uno', 'Lo reciben todos menos el que solicito');
    io.emit('recibe_todos', 'Todos lo reciben');

    
    // Actualización a todos los clientes
    const emitProductUpdate = async () => {
        const updatedProducts = await productManager.getProducts();
        io.emit('update_products', updatedProducts);
    };    

    // Después de crear un producto
    socket.on('create_product', async productData => {
        // Lógica para crear un producto
        await productManager.addProduct(productData);
        
        // Actualización a todos los clientes después de crear un producto
        emitProductUpdate();
    });

    // Eliminar un producto
    socket.on('delete_product', async productId => {
        // Lógica para eliminar un producto
        await productManager.deleteProduct(productId);
        
        // Actualización a todos los clientes después de eliminar un producto
        emitProductUpdate();
    });
});