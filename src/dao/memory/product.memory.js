export default class ProductMemory {
    constructor() {
        this.products = [];
    }

    async getProducts(limit = 10, page = 1, query = '', sort = '') {
        try {
            // Aplicar la lógica para filtrar, paginar y ordenar los productos en la memoria
            let filteredProducts = this.products;

            // Aplicar filtrado si hay una consulta
            if (query) {
                const [code, value] = query.split(':');
                filteredProducts = filteredProducts.filter(product => product[code] === value);
            }

            // Aplicar ordenamiento si se especifica
            if (sort) {
                filteredProducts.sort((a, b) => {
                    if (sort === 'asc') {
                        return a.price - b.price;
                    } else if (sort === 'desc') {
                        return b.price - a.price;
                    }
                });
            }

            // Aplicar paginación
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

            return { message: 'OK', rdo: paginatedProducts };
        } catch (error) {
            return { message: 'ERROR', rdo: `Error al obtener los productos - ${error.message}` };
        }
    }

    async addProduct(product) {
        try {
            // Validar si el producto ya existe
            const existingProduct = this.products.find(p => p.code === product.code);
            if (existingProduct) {
                return { message: 'ERROR', rdo: 'Producto con código existente!' };
            }

            // Agregar el producto a la lista
            this.products.push(product);
            return { message: 'OK', rdo: 'Producto dado de alta correctamente' };
        } catch (error) {
            return { message: 'ERROR', rdo: "Error al agregar el producto - " + error.message };
        }
    }

    async getProductById(id) {
        try {
            // Buscar el producto por ID
            const product = this.products.find(p => p._id === id);
            if (product) {
                return { message: 'OK', rdo: product };
            } else {
                return { message: 'ERROR', rdo: 'El producto no existe' };
            }
        } catch (error) {
            return { message: 'ERROR', rdo: "Error al obtener el producto - " + error.message };
        }
    }

    async deleteProduct(id) {
        try {
            // Eliminar el producto por ID
            const index = this.products.findIndex(p => p._id === id);
            if (index !== -1) {
                this.products.splice(index, 1);
                return { message: 'OK', rdo: `Producto con ID ${id} eliminado exitosamente.` };
            } else {
                return { message: 'ERROR', rdo: `No se encontró un producto con el ID ${id}. No se pudo eliminar.` };
            }
        } catch (error) {
            return { message: 'ERROR', rdo: "Error al eliminar el producto - " + error.message };
        }
    }

    async updateProduct(id, updateProduct) {
        try {
            // Buscar el producto por ID y actualizarlo
            const index = this.products.findIndex(p => p._id === id);
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...updateProduct };
                return { message: 'OK', rdo: `Producto con ID ${id} actualizado exitosamente.` };
            } else {
                return { message: 'ERROR', rdo: `No se encontró un producto con el ID ${id}. No se pudo actualizar.` };
            }
        } catch (error) {
            return { message: 'ERROR', rdo: "Error al actualizar el producto - " + error.message };
        }
    }
}