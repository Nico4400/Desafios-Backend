// import CartManager from "../dao/managers/CartManager.js";
// import CartDTO from "../dtos/cart.dto.js";
import { cartService, productService, ticketService } from "../dao/repositories/index.repository.js";
import { generateCode } from "../utils/functions.js";


// Obtener todos los carritos
export const getCarts = async (req, res) => {
    try {
        const { limit } = req.query;
        const result = await cartService.getCarts();
        if (result.message === "OK") {        
            if (!limit) 
                return res.status(200).json(result);  
            const cartsLimit = result.rdo.slice(0, limit);
            return res.status(200).json(cartsLimit);
        }
        res.status(400).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un carrito por su ID
export const getCartById = async (req, res) => {
    try {
        const { cId } = req.params;
        const result = await cartService.getCartById(cId);
        if (result.message === "OK") {
            return res.status(200).json(result);
        }
        res.status(400).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Crear un nuevo carrito
export const postCart = async (req, res) => {    
    try {
        const result = await cartService.postCart();
        if (result.message === "OK") {
            return res.status(200).json(result);
        }
        res.status(400).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Agregar un producto a un carrito
export const postProductInCart = async (req, res) => {
    try {
        const { cId, pId } = req.params;
        const newQuantity =  req.body.quantity;
        const result = await cartService.postProductInCart(cId, pId, newQuantity);
        if (result) {
            return res.status(200).json({ message: 'Producto agregado al carrito correctamente' });
        }
        res.status(400).json({ message: 'No se pudo agregar el producto al carrito' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar todos los productos de un carrito
export const deleteAllProductsInCart = async (req, res) => {
    try {
        const { cId } = req.params;
        const result = await cartService.deleteAllProductsInCart(cId);
        if (result) {
            return res.status(200).json({ message: 'Todos los productos eliminados del carrito correctamente' });
        }
        res.status(400).json({ message: 'No se pudieron eliminar los productos del carrito' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un producto de un carrito
export const deleteProductInCart = async (req, res) => {
    const { cId, pId } = req.params;
    try {
        const result = await cartService.deleteProductInCart(cId, pId);
        if (result) {
            return res.status(200).json({ message: 'Producto eliminado del carrito correctamente' });
        }
        res.status(400).json({ message: 'No se pudo eliminar el producto del carrito' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  

// Actualizar un carrito por su ID
export const putCartById = async (req, res) => {
    const { cId } = req.params;
    const cart = req.body;
    try {
        const result = await cartService.updateCart(cId, cart);
        if (result.modifiedCount > 0) { 
            res.status(200).json({ message: 'Carrito actualizado correctamente' });
        } else {
            res.status(400).json({ message: 'No se pudo actualizar el carrito' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar la cantidad de un producto en un carrito
export const putProductInCart = async (req, res) => {
    const { cId, pId } = req.params;
    const { quantity } = req.body;
    try {
        const result = await cartService.updateProductInCart(cId, pId, quantity);
        if (result) {
            res.status(200).json({ message: 'Cantidad del producto actualizada en el carrito correctamente' });
        } else {
            res.status(400).json({ message: 'No se pudo actualizar la cantidad del producto en el carrito' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// export const purchaseCartById = async (req, res) => {
//     try {
//         const { cId } = req.params;

//         // Obtener los productos del carrito por su ID
//         const cart = await cartService.getCartById(cId);

//         // Verificar si se encontró el carrito
//         if (cart) {
//             let totalTicket = 0;
//             const prodSinStock = [];

//             // Recorrer los productos del carrito
//             for (const item of cart.products) {
//                 const product = item.product;
//                 const quantity = item.quantity;
//                 const stock = product.stock;
//                 const id = product._id;
//                 const price = product.price;

//                 // Verificar si la cantidad es menor o igual al stock
//                 if (quantity <= stock) {
//                     // Actualizar el stock del producto
//                     const updatedStock = stock - quantity;
//                     await productService.updateProduct(id, { stock: updatedStock });

//                     // Calcular el total del ticket sumando el precio del producto por la cantidad
//                     totalTicket += price * quantity;
//                 } else {
//                     // Si no hay suficiente stock, agregar el ID del producto al array de productos sin stock
//                     prodSinStock.push(item._id);
//                 }
//             }

//             // Crear un nuevo ticket con los detalles de la compra
//             const ticket = {
//                 code: generarCodigoAleatorio(),
//                 purchase_datetime: new Date(),
//                 amount: totalTicket,
//                 purchaser: req.user.email
//             };
//             const addedTicket = await ticketService.addTicket(ticket);

//             // Mensaje final indicando si la compra se realizó completa o parcialmente
//             const messageFinal = prodSinStock.length > 0 ? 'Compra realizada parcialmente. Productos sin stock: ' + prodSinStock.join(', ') : 'Compra realizada completamente';
            
//             // Enviar la respuesta con el mensaje final
//             return res.status(200).json({ message: messageFinal });
//         }

//         // Si no se encontró el carrito, enviar un mensaje de error
//         res.status(404).json({ message: 'Carrito no encontrado' });
//     } catch (error) {
//         // Enviar un mensaje de error si ocurre algún error durante el proceso
//         res.status(400).json({ message: error.message });
//     }
// }

export const purchaseCartById = async (req, res) => {
    const { cId } = req.params
    const cart = await cartService.getCartById(cId);
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
    }
    let totalAmount = 0
    let noStockProducts = []
    
    const productsInCart = cart.rdo.products.map(async prod => {
        const productId = prod.product;
        const product = await productService.getProductById(productId);
        const quantity = prod.quantity;
        const id = prod._id;
        const stock = product.rdo.stock;
        const price = product.rdo.price;
        if (quantity <= stock) {
            const updatedItem = await productService.updateProduct(id, { stock: stock - quantity })
            if (updatedItem) {
                totalAmount += (price * quantity)
            }
        } else {
            noStockProducts.push({ product: id, quantity: quantity })
        }
    })

    await Promise.all(productsInCart)

    //Creación de Ticket
    const ticket = await ticketService.addTicket({
        code: generateCode(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: req.user.rdo.email
    })

    if (!ticket) {
        return res.status(400).send({ status: 'error', message: 'Something went wrong' })
    }

    if (noStockProducts.length > 0) {
        //Se actualiza el carrito para que quede con productos sin stock suficiente
        await cartService.updateCart(cId, { products: noStockProducts })
        return res.send({ message: 'Some products could not be purchased', products: noStockProducts })
    } else {
        await cartService.deleteAllProductsInCart(cId) //Se vacía el carrito
        // return res.send(ticket)
        return res.redirect('/ticket/' + ticket.rdo._id);
    }
}