export default class CartMemory {
    constructor() {
        this.carts = [];
    }

    async getCarts() {
        try {
            return { message: "OK", rdo: this.carts };
        } catch (error) {
            return { message: 'ERROR', rdo: "No se pudieron obtener los carritos correctamente" };
        }
    }

    async getCartById(cartId) {
        try {
            const cart = this.carts.find(cart => cart._id === cartId);
            if (cart) {
                return { message: "OK", rdo: cart };
            } else {
                return { message: "ERROR", rdo: "El carrito no existe" };
            }
        } catch (error) {
            return { message: 'ERROR', rdo: "Error al obtener el carrito - " + error.message };
        }
    }

    async addCart(newCart) {
        try {
            this.carts.push(newCart);
            return { message: "OK", rdo: "Carrito agregado correctamente" };
        } catch (error) {
            return { message: 'ERROR', rdo: "Error al agregar el carrito - " + error.message };
        }
    }

    async updateCart(cartId, updatedCart) {
        try {
            const index = this.carts.findIndex(cart => cart._id === cartId);
            if (index !== -1) {
                this.carts[index] = updatedCart;
                return { message: "OK", rdo: "Carrito actualizado correctamente" };
            } else {
                return { message: "ERROR", rdo: "El carrito no existe" };
            }
        } catch (error) {
            return { message: 'ERROR', rdo: "Error al actualizar el carrito - " + error.message };
        }
    }
}