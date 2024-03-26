import CartDTO from "../../dtos/cart.dto.js";

export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    // Obtener todos los carritos
    getCarts = async () => {
        const result = await this.dao.getCarts();
        return result;
    }

    // Obtener un carrito por su ID
    getCartById = async (cId) => {
        const result = await this.dao.getCartById(cId);
        return result;
    }

    // Crear un nuevo carrito
    postCart = async () => {
        const newCart = new CartDTO({ products: [] });
        const result = await this.dao.postCart(newCart);
        return result;
    }

    // // Agregar un producto a un carrito
    // postProductInCart = async (cartId, productId, quantity) => {
    //     const cart = await this.dao.postProductInCart(cartId);
    //     if (cart) {
    //         const product = {
    //             productId,
    //             quantity
    //         };
    //         cart.products.push(product);
    //         await cart.save();
    //         return { message: "OK", rdo: "Producto agregado al carrito correctamente" };
    //     } else {
    //         return { message: "ERROR", rdo: "El carrito no existe" };
    //     }
    // }

     // Agregar un producto a un carrito
     postProductInCart = async (cId, pId, quantity) => {
        const result = await this.dao.postProductInCart(cId, pId, quantity);
        return result
    }

    // Eliminar todos los productos de un carrito
    deleteAllProductsInCart = async (cId) => {
        const result = await this.dao.deleteAllProductsInCart(cId);
        return result
    }

    // Eliminar un producto de un carrito
    deleteProductInCart = async (cd, pId) => {
        const result = await this.dao.deleteProductInCart(cId, pId);
        return result
    }

    // Actualizar un carrito por su ID
    updateCart = async (cId, cart) => {
        const result = await this.dao.updateCart(cId, cart);
        return result;
    }

    // Actualizar la cantidad de un producto en un carrito
    updateProductInCart = async (cId, pId, quantity) => {
        const result = await this.dao.updateProductInCart(cId, pId, quantity);
        return result;
    }
}