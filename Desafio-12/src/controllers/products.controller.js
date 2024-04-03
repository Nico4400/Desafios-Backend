// import ProductManager from "../dao/managers/ProductManager.js";
import { productService , userService } from "../dao/repositories/index.repository.js";
import ProductDTO from "../dtos/product.dto.js";
import ErrorEnum from "../services/errors/error.enum.js";
import CustomErrors from "../services/errors/CustomError.js";
import { createProductErrorInfo, getProductsErrorInfo, getSingleProductErrorInfo } from "../services/errors/info.js";


export const getProducts = async (req, res) => {
    try {
        const { limit, page, query, sort } = req.query;
        const response = await productService.getProducts(limit, page, query, sort);
        if (!response.message === 'OK') {
            CustomErrors.createError({
                name: "Cannot get products",
                cause: getProductsErrorInfo(),
                message: "Error trying to get products",
                code: ErrorEnum.DATABASE_ERROR
            })
        }
        res.status(200).json(response);        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { pId } = req.params;
        const response = await productService.getProductById(pId);
        if (!response.message === 'OK') {
            CustomErrors.createError({
                name: "Product not found",
                cause: getSingleProductErrorInfo(pId),
                message: "Error trying to find product",
                code: ErrorEnum.INVALID_ID_ERROR
            })
        }
            res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
};

export const postProduct = async (req, res) => {
    try {
        const products = await productService.getAllProducts()
        const {title, price, description, status, code, stock, category, thumbnail} = req.body;
        if(
            (!title || !price || !description || !code || !stock || !category || !thumbnail) || 
            products.find(p => p.code === code)
        ){
            CustomErrors.createError({
                name: 'Product creation fails',
                cause: createProductErrorInfo(req.body),
                message: 'Error tryng to create user',
                code: ErrorEnum.INVALID_TYPE_ERROR 
            })
        }
        const user = req.user;
        if(user.message !== 'OK') return res.status(404).send({status:"error",error:"User not found"});
        const ownerId = user.rdo._id;
        const newProduct = {
            title,
            price,
            description,
            status,
            code,
            stock,
            category,
            thumbnail,
            owner: ownerId
        };
        console.log(newProduct)
        const response = await productService.addProduct(newProduct);
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al agregar el producto" });
    }
};

export const putProduct = async (req, res) => {
    try {
        const { pId } = req.params;
        const updateProd = req.body;
        const response = await productService.updateProduct(pId, updateProd);
        if (response.message === 'OK') {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { pId } = req.params;
        const response = await productService.deleteProduct(pId);
        if (response.message === 'OK') {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
};