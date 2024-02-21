import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import viewsRouters from './routes/views.routes.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import chatsRouter from './routes/chats.routes.js';

import { productModel } from './dao/models/product.model.js';
// import ProductManager from './dao/ProductManager.js';
// const productManager = new ProductManager('./src/Products.json');
import { ChatManager } from './dao/ChatManager.js';

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

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error de conexión a MongoDB:', err);
});

db.once('open', () => {
    console.log('Conexión a MongoDB establecida con éxito');
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chats', chatsRouter)
app.use('/', viewsRouters);

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

const chatManager = new ChatManager();

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    
    socket.on('message', data => {
        console.log(data);
        // Para ver los productos cuando se conecta el cliente
        emitProductUpdate();
        emitChatsUpdate();
    });

    // Para ver cómo funciona
    socket.emit('recibe_uno', 'Esto lo recibe uno solo');
    socket.broadcast.emit('reciben_todos_menos_uno', 'Lo reciben todos menos el que solicito');
    io.emit('recibe_todos', 'Todos lo reciben');

    
    // Actualización a todos los clientes
    const emitProductUpdate = async () => {
        const updatedProducts = await productModel.find();
        io.emit('update_products', updatedProducts);
    };    

    // Después de crear un producto
    socket.on('create_product', async productData => {
        // Lógica para crear un producto
        await productModel.create(productData);
        
        // Actualización a todos los clientes después de crear un producto
        emitProductUpdate();
    });

    // Eliminar un producto
    socket.on('delete_product', async productId => {
        // Lógica para eliminar un producto
        await productModel.deleteOne(productId);
        
        // Actualización a todos los clientes después de eliminar un producto
        emitProductUpdate();
    });

    // Actualización a todos los chats
    const emitChatsUpdate = async () => {        
        const getChats = await chatManager.getChats();
        io.emit('chatLogs', getChats);
    };

    // Crear un chat
    socket.on('create_chat', async data => {
        await chatManager.addChat(data);    
        // Actualización a todos los clientes después de crear un Chat
        emitChatsUpdate();
    });

});