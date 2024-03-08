// import ProductManager from "../dao/managers/ProductManager.js";
import { productService } from "../dao/repositories/index.repository.js";

export const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query = '', sort = '' } = req.query;
        const response = await productService.getProducts(limit, page, query, sort);
        if (response.message === 'OK') {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { pId } = req.params;
        const response = await productService.getProductById(pId);
        if (response.message === 'OK') {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
};

export const postProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const response = await productService.postProduct(newProduct);
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
        const response = await productService.putProduct(pId, updateProd);
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