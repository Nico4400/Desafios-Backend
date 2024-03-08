import CartDTO from "../../dtos/cart.dto.js";

export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    // Obtener todos los carritos
    getCarts = async () => {
        const result = await this.dao.getAll();
        return result;
    }

    // Obtener un carrito por su ID
    getCartById = async (cartId) => {
        const result = await this.dao.getById(cartId);
        return result;
    }

    // Crear un nuevo carrito
    postCart = async () => {
        const newCart = new CartDTO({ products: [] });
        const result = await this.dao.create(newCart);
        return result;
    }

    // Agregar un producto a un carrito
    postProductInCart = async (cartId, productId, quantity) => {
        const cart = await this.dao.getById(cartId);
        if (cart) {
            const product = {
                productId,
                quantity
            };
            cart.products.push(product);
            await cart.save();
            return { message: "OK", rdo: "Producto agregado al carrito correctamente" };
        } else {
            return { message: "ERROR", rdo: "El carrito no existe" };
        }
    }

    // Eliminar todos los productos de un carrito
    deleteAllCartById = async (cartId) => {
        const cart = await this.dao.getById(cartId);
        if (cart) {
            cart.products = [];
            await cart.save();
            return { message: "OK", rdo: "Todos los productos eliminados del carrito correctamente" };
        } else {
            return { message: "ERROR", rdo: "El carrito no existe" };
        }
    }

    // Eliminar un producto de un carrito
    deleteProductInCart = async (cartId, productId) => {
        const cart = await this.dao.getById(cartId);
        if (cart) {
            cart.products = cart.products.filter(product => product.productId !== productId);
            await cart.save();
            return { message: "OK", rdo: "Producto eliminado del carrito correctamente" };
        } else {
            return { message: "ERROR", rdo: "El carrito no existe" };
        }
    }

    // Actualizar un carrito por su ID
    putCartById = async (cartId, newData) => {
        const result = await this.dao.update(cartId, newData);
        return result;
    }

    // Actualizar la cantidad de un producto en un carrito
    putProductInCart = async (cartId, productId, quantity) => {
        const cart = await this.dao.getById(cartId);
        if (cart) {
            const product = cart.products.find(product => product.productId === productId);
            if (product) {
                product.quantity = quantity;
                await cart.save();
                return { message: "OK", rdo: "Cantidad del producto actualizada en el carrito correctamente" };
            } else {
                return { message: "ERROR", rdo: "El producto no existe en el carrito" };
            }
        } else {
            return { message: "ERROR", rdo: "El carrito no existe" };
        }
    }
}