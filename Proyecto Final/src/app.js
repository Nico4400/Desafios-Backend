import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import FileStore from 'session-file-store';
import passport from 'passport';
import { Command } from 'commander'
import { getVariables } from './config/config.js';
import initializePassport from './config/passport.config.js';
import { addLogger } from './utils/logger.js';
import processOptions from './utils/process.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express'

import viewsRouters from './routes/views.routes.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import chatsRouter from './routes/chats.routes.js';
import sessionsRouter from './routes/sessions.routes.js';
import ticketRouter from './routes/tickets.routes.js';
import mockRouter from './routes/mock.routes.js';
import loggerRouter from './routes/logger.routes.js';

import ProductManager from './dao/managers/ProductManager.js';
import { ChatManager } from './dao/managers/ChatManager.js';
import { productService } from './dao/repositories/index.repository.js';
import { secret } from './config/consts.js'
import { ErrorHandler } from './middlewares/ErrorHandler.js';
import { swaggerConfiguration } from './utils/swagger-configuration.js';

const fileStore = FileStore(session);
const app = express();

const { PORT, MONGO_URL } = getVariables(processOptions);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(addLogger);

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
});

app.engine('handlebars', hbs.engine);
app.set('views', 'src/views');
app.set('view engine', 'handlebars');


app.use(session({
    secret: secret,
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
    }),
    resave: true,
    saveUninitialized: true
}));

// Swagger documentación
const specs = swaggerJSDoc(swaggerConfiguration)
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error de conexión a MongoDB:', err);
});

db.once('open', () => {
    console.log('Conexión a MongoDB establecida con éxito');
});


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/ticket', ticketRouter);
app.use('/api/mock', mockRouter);
app.use('/api/loggerTest', loggerRouter);
app.use('/', viewsRouters);
app.use(ErrorHandler);

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

const productManager = new ProductManager();
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
    const emitProductUpdate = async (prod = 10000) => {
        const updatedProducts = await productService.getProducts(prod);
        console.log('Type of updatedProducts:', typeof updatedProducts);
        io.emit('update_products', updatedProducts);
    };    

    // Después de crear un producto
    socket.on('create_product', async productData => {
        // Lógica para crear un producto
        
        await productService.addProduct(productData);
        
        // Actualización a todos los clientes después de crear un producto
        emitProductUpdate();
    });

    // Eliminar un producto
    socket.on('delete_product', async productIdToDelete => {
        try {
            // Lógica para eliminar un producto
            console.log("Eliminar producto con ID:", productIdToDelete);
            const response = await productService.deleteProduct(productIdToDelete);    
            // Si la eliminación fue exitosa, emitir un evento de actualización
            if (response.message === 'OK') {
                io.emit('product_deleted', productIdToDelete);
            } else {
                console.error('Error al eliminar producto:', response.rdo);
                // Puedes emitir un evento de error al cliente si lo deseas
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error.message);
            // Puedes emitir un evento de error al cliente si lo deseas
        }
        
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