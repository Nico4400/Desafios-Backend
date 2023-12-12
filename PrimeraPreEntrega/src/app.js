import express from 'express';

import productsRoutes from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('Hola mundo desde saludo!');
});

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});