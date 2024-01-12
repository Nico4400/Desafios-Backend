import { Router } from "express";
import { productModel } from "../dao/models/product.model.js";

// import ProductManager from "../ProductManager.js";

// const productManager = new ProductManager('./src/Products.json');

const productsRouter = Router();

// productsRouter.post('/', async (req, res) => {
//     const product = req.body;
//     const products = await productManager.addProduct(product);
//     res.send({status: 'ok', message: 'Producto Creado', product});
// });

productsRouter.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        await productModel.create(newProduct);
        res.status(201).json({message: 'Producto añadido'});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: `No se pudo añadir el producto - ${error}`});
    }
  });

// productsRouter.get('/', async (req, res) => {
//     const {limit} = req.query;
//     const products = await productManager.getProducts(limit);
//     if(limit){
//         return res.send(products);
//     }
//     return res.send(products);
// });

productsRouter.get('/', async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({products});        
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'users not fopund'});
    }    
});

productsRouter.get('/:pId', async (req, res) => {
    const { pId } = req.params;
    try {
        const product = await productModel.findOne({_id: pId});
        res.send({product});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: `No podemos devolver el producto de ID: ${pId} - ${error}`});
    }
});

productsRouter.delete('/:pId', async (req, res) => {
    const { pId } = req.params;
    try {
        const productDeleted = await productModel.deleteOne({_id: pId});
        if(productDeleted.deleteCount > 0){
            return res.send({message: `Producto eliminado correctamente - Id: ${pId}`});
        }
        res.send({message: `Producto NO encontrado - Id: ${pId}`});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: `No se pudo eliminar el producto - ${error}`});
    }
});
  
productsRouter.put('/:pId', async (req, res) => {
    const { pId } = req.params;
    const productToUpdate = req.body;
    try {
        const update = await productModel.updateOne({_id: pId}, productToUpdate);
        if(update.modifiedCount > 0){
        return res.send({message: `Producto modificado exitosamente - Id: ${pId}`});
        } else {
        res.status(404).json({message: `Producto NO modificado - Id: ${pId}`});
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({message: `No se pudo modificar el producto - ${error}`});
    }
});


// productsRouter.put('/:pId', async (req, res) => {
//     const {pId} = req.params;    
//     const prod = await productManager.getProductById(pId);    
//     if(!prod){
//         res.send({error: 'producto no Encontrado'});
//     }
//     const productToUpdate = req.body;
//     const product = await productManager.updateProduct(pId, productToUpdate);    
//     return res.send({message: 'Producto updated', pId, productToUpdate});    
// });

// productsRouter.get('/:pId', async (req, res) => {
//     const {pId} = req.params;
//     try {
//         const product = await productManager.getProductById(pId);
//         res.send(product);        
//     } catch (error) {
//         res.status(404).send({message: 'producto no encontrado'});
//     }

// });

// productsRouter.delete('/:pId', async (req,res) => {
//     const {pId} = req.params;
//     const prod = await productManager.deleteProduct(pId);
//     if(!prod){
//         return res.status(400).send({message: 'error, producto no Eliminado'});
//     }
//     res.send({message: 'Producto Eliminado'});    
// });

export default productsRouter;