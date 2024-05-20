import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

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
        unique: true,
    },
    price: {
        type: Number,
        required: false
    },
    status: {
        type: Boolean,
        required: true,
        default: 1
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Schema.ObjectId, 
        required: true,
        ref: 'users',
    }
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollecion, productSchema);