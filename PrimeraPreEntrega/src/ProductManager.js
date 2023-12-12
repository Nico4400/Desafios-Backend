// llamo a FileSistem
import fs from 'fs';

// Declaro la clase.
class ProductManager {
    constructor(path) {
        this.path = path;
    }

    // Veo el tamaño del array y así puedo sumar '1' al ID a medida q se crean.
    async getLenght(){
        const products = await this.getProducts();
        return products.length;
    }

    // Metodo para agregar Productos.
    async addProduct(product){

        if(
            !product.title ||
            !product.description ||
            !product.code ||
            !product.price ||
            !product.stock ||
            !product.thumbnail
        ) {
            return console.log('Todos los campos son obligatorios.');
        }

        // Incremento el ID según se van creando los prod.    
        const products = await this.getProducts();
        const id = await this.getLenght();
        const newProduct = {
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            stock: product.stock,
            thumbnail: product.thumbnail,
            id: id + 1
        } 
        products.push(newProduct);

        // Lo copio como string.
        await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
    }

    // Obtengo los Productos.
    async getProducts(limit){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            let products = JSON.parse(data);

            if (limit) {
                products = products.slice(0, parseInt(limit, 10));
            }
            return products;
        } catch (error) {
            return [];
        }
    }

    // Busco Prod por ID.
    async getProductById(id){
        const products = await this.getProducts();
        const product = products.find(p => p.id === parseInt(id));
        if(!product) {
            return console.log('Producto no encontrado');
        }
        return product;        
    }

    // Borro Prod según ID.
    async deleteProduct(id){
        const products = await this.getProducts();
        const productId = products.some(prod => prod.id === +id);

        if(productId){
            const productsDelete = products.filter(p => p.id !== +id);
            await fs.promises.writeFile(this.path, JSON.stringify(productsDelete), 'utf-8');
            return true;
        } else {
            console.log(`ID: ${id} no encontrado`);
        }
    }

    // Metodo para Actualizar Productos.
    async updateProduct(id, productToUpdate ){
        const products = await this.getProducts();
        const productUpdated = products.map(product => {
            if(product.id === id){
                return {
                    ...product,
                    ...productToUpdate,
                    id
                }    
            }
            return product;
        })
        await fs.promises.writeFile(this.path, JSON.stringify(productUpdated), 'utf-8');
    }
}
export default ProductManager;