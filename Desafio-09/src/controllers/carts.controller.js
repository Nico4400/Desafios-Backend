import CartManager from "../dao/managers/CartManager.js";


export const getCarts = async (req, res) => {
    try {
        const { limit } = req.query;
        const carts = new CartManager();  
        const result = await carts.getCarts();  
        if(result.message === "OK") {        
            if(!limit) 
                return res.status(200).json(result);  
            const productsLimit = result.rdo.slice(0, limit);
            return res.status(200).json(productsLimit);
        }
        res.status(400).json(result);
    } catch (err) {
        res.status(400).json({ message: "Error al obtener los carritos" + err.menssage });
    }
};
  
export const getCartById = async (req, res) => {
    try {
        const { cId } = req.params;
        const products = new CartManager();  
        const result = await products.getProductsCartById(cId);
        if(result.message === "OK") {
            return res.status(200).json(result);
        }
        res.status(400).json(result);
    } catch(err) {
        res.status(400).json({message: "El carrito no existe"});
    }
};
  
export const postCart = async (req, res)=> {    
    try {
        const carts = new CartManager();
        const result = await carts.addCart({products:[]});  
        if(result.message === "OK") {
            return res.status(200).json(result);
        }
        res.status(400).json(result);
    } catch(err) {
        res.status(400).json({message: err});
    }
};
  
export const postProductInCart = async (req, res) => {
    try{
        const { cId, pId } = req.params;
        const newQuantity =  req.body.quantity;
        const carts = new CartManager();
        const result = await carts.addProductsInCart(cId, pId, newQuantity);  
        if(result) {
            return res.status(200).json({message: 'Product added'});
        }
        res.status(400).json({message: 'could not add product'});
    } catch(err) {
      res.status(400).send({err});
    }
};
  
export const deleteAllCartById = async (req, res) => {
    try{
        const { cId } = req.params;
        const carts = new CartManager();  
        const deleted = await carts.deleteAllProductsInCart(cId);  
        if (deleted)
            return res.status(200).json({message: 'Products deleted'});    
        return res.status(404).json({menssage: 'could not delete products'});
    } catch(err) {
        res.status(400).json({menssage: err});
    }
};
  
export const deleteProductInCart = async (req, res) => {
    const { cId, pId } = req.params;
    const cartManager = new CartManager();
    try {
        const result = await cartManager.deleteProductInCart(cId, pId);
        if(result) {
            res.send({message: 'Product deleted'});
        } else {
            res.status(400).json({message: 'could not delete product'});
        }
    } catch(error) {
        console.error(error);
        res.status(400).json({message: 'could not delete product'});
    }
};  
  
export const putCartById = async (req, res) => {
    const cartManager = new CartManager();
    const { cId } = req.params;
    const cart = req.body;
    try {
        const result = await cartManager.updateCart(cId, cart);
        if(result.modifiedCount > 0) { 
            res.send({message: 'Cart updated'});
        } else {
            res.status(400).send({message: 'Could not update cart'});
        }
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'Could not update cart'});
    }
};
  
export const putProductInCart = async (req, res) => {
    const { cId, pId } = req.params;
    const { quantity } = req.body;
    const cartManager = new CartManager();
    const result = await cartManager.updateProductInCart(cId, pId, quantity);
    if(result) {
        res.send({message: 'Product updated'});
    } else {
        res.status(400).send({message: 'could not update product'});
    }
};


