import mongoose from "mongoose";

const productCollecion = 'products';

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    } ,
    description:  {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: false
    },
    // available: {
    //     type: Boolean,
    //     required: true,
    //     default: 1
    // },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    // category: {
    //     type: String,
    //     required: true,
    // },
    thumbnail: {
        type: String,
        required: false
    } 
});

export const productModel = mongoose.model(productCollecion, productSchema);