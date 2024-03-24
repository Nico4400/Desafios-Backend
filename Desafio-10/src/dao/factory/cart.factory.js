import mongoose from "mongoose";
import { getVariables } from "../../config/config.js";

const options = { opts: () => ({ mode: process.env.NODE_ENV }) };
const { MONGO_URL, persistence } = getVariables(options);

let Carts;

switch (persistence) {
    case 'MONGO':
        const { default: CartManager } = await import('../managers/CartManager.js');
        mongoose.connect(MONGO_URL);
        Carts = CartManager;
        break;

    case 'MEMORY':
        const { default: CartMemory } = await import('../memory/cart.memory.js');
        Carts = CartMemory;
        break;
}

export default Carts;