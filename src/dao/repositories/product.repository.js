import ProductDTO from "../../dtos/product.dto.js";

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }
    
    getAllProducts = async () => {
        const result = await this.dao.getAllProducts()
        return result
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

    async addProduct(productData) {
        const response = await this.dao.addProduct(productData);
        return response;
    }

    async updateProduct(productId, newData) {
        const response = await this.dao.updateProduct(productId, newData);
        return response;
    }

    async deleteProduct(productId) {
        const response = await this.dao.deleteProduct(productId);
        return response;
    }
}