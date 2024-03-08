import ProductDTO from "../../dtos/product.dto.js";

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getProducts(limit = 10, page = 1, query = '', sort = '') {
        const response = await this.dao.getProducts(limit, page, query, sort);
        if (response) {
            return response;
        } else {
            return { message: 'Not found' };
        }
    }

    async getProductById(productId) {
        const response = await this.dao.getProductById(productId);
        return response;
    }

    async postProduct(productData) {
        const newProduct = new ProductDTO(productData);
        const response = await this.dao.addProduct(newProduct);
        return response;
    }

    async putProduct(productId, newData) {
        const response = await this.dao.updateProduct(productId, newData);
        return response;
    }

    async deleteProduct(productId) {
        const response = await this.dao.deleteProduct(productId);
        return response;
    }
}