import mongoose from "mongoose";

const cartCollection = 'carts'

const productSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    }
});

const cartSchema = mongoose.Schema({
    products: {
        type: [productSchema],
        required: true
    } 
});

export const cartModel = mongoose.model(cartCollection, cartSchema)