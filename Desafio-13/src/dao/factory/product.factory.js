import mongoose from "mongoose";
import { getVariables } from "../../config/config.js";
import processOptions from "../../utils/process.js";

// const options = { opts: () => ({ mode: process.env.NODE_ENV }) };
const { MONGO_URL, persistence } = getVariables(processOptions);

let Products;

switch (persistence) {
    case 'MONGO':
        const { default: ProductManager } = await import('../managers/ProductManager.js');
        mongoose.connect(MONGO_URL);
        Products = ProductManager;
        break;

    case 'MEMORY':
        const { default: ProductMemory } = await import('../memory/product.memory.js');
        Products = ProductMemory;
        break;
}

export default Products;