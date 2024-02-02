import { Router } from "express";
import ProductManager from "../dao/managers/ProductManager.js";


const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, query = '', sort = '' } = req.query;
        const products = new ProductManager();  
        const response = await products.getProducts(limit, page, query, sort);
        if(response) {
            res.send(response);
        }
        else{
            res.status(400).json({message: 'Not found'});
        }
    } catch (err) {
        console.log({err});
        res.status(400).json({ message: "Error al obtener los productos" + err.menssage });
    }
});

productsRouter.get("/:pId", async (req, res) => {
    try{
        const { pId } = req.params;
        const products = new ProductManager();    
        const response = await products.getProductById(pId);
        if (response.message === "OK") {
            return res.status(200).json(response);
        }
        res.status(400).json(response);
    } catch(err) {
        res.status(400).json({message: "El producto no existe"});
    }
});

productsRouter.post('/', async (req,res) => {
    try{
        const products = new ProductManager();
        const newProduct = req.body;
        const response = await products.addProduct(newProduct);
        if (response.message === "OK") {
            return res.status(200).json(response);
        }
        res.status(400).json(response);
    } catch(err) {
        res.status(400).json({message: err});
    }
});

productsRouter.put('/:pId',async (req,res) => {
    try{
        const { pId } = req.params;
        const updateProd = req.body;
        const products = new ProductManager();    
        const response = await products.updateProduct(pId, updateProd);    
        if (response.message === "OK") {
            return res.status(200).json(response);
        }
        res.status(400).json(response);
    } catch(err) {
      res.status(400).json({menssage: 'err'});
    }
});

productsRouter.delete('/:pId',async (req,res)=>{
    try{
        const { pId } = req.params;
        const products = new ProductManager();  
        const deleted = await products.deleteProduct(pId);  
        if (deleted.message === "OK") {
            return res.status(200).json(deleted.rdo);
        }
        res.status(404).json(deleted.rdo);
        } catch(err) {
            res.status(400).json({menssage: err});
        }
});

export default productsRouter;