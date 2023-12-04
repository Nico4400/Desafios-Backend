// Consigna.
// ✓ Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).

// Aspectos a incluir.
// ✓ La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.

// ✓ Debe guardar objetos con el siguiente formato:
// - id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
// - title (nombre del producto)
// - description (descripción del producto)
// - price (precio)
// - thumbnail (ruta de imagen)
// - code (código identificador)
// - stock (número de piezas disponibles)

// Aspectos a incluir.
// ✓ Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
// ✓ Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
// ✓ Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
// ✓ Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
// ✓ Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo. Formato del entregable
// ✓ Archivo de javascript con el nombre ProductManager.js


// llamo a FileSistem
import fs from 'fs';
// const fs = require('fs');

// Declaro la clase.
class ProductManager {
    constructor(path) {
        this.path = path;
    }

    // Seteo el ID en '0'.
    // static id = 0;

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
        // ProductManager.id++;
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
            return console.log('Producto no encontrado')
        }
        return product;        
    }

    // Borro Prod según ID.
    async deleteProduct(id){
        const products = await this.getProducts();
        const productsDelete = products.filter(p => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(productsDelete), 'utf-8');
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

// const test = async() => {
    // const productManager = new ProductManager('./products.json')
    // Creo Productos.
    // await productManager.addProduct({
    //     title: 'producto 1',
    //     description: 'descripción del producto 1',
    //     code: 'P001',
    //     price: 100,
    //     stock: 10,
    //     thumbnail: './asd1.jpg'        
    // });
    // await productManager.addProduct({
    //     title: 'producto 2',
    //     description: 'descripción del producto 2',
    //     code: 'P002',
    //     price: 200,
    //     stock: 20,
    //     thumbnail: './asd2.jpg'        
    // });
    // await productManager.addProduct({
    //     title: 'producto 3',
    //     description: 'descripción del producto 3',
    //     code: 'P003',
    //     price: 300,
    //     stock:30,
    //     thumbnail: './asd3.jpg'        
    // });
    // await productManager.addProduct({
    //     title: 'producto 4',
    //     description: 'descripción del producto 4',
    //     code: 'P004',
    //     price: 400,
    //     stock: 40,
    //     thumbnail: './asd4.jpg'        
    // });


//     // Pruebas...
//     // Busco un prod.
//     const prod2 = await productManager.getProductById(2)
//     console.log(prod2)

//     // Actualizo un prod.
//     await productManager.updateProduct(4, {
//         description: 'Nueva Descripción del Prod 9'
//     })

//     // Elimino un prod.
//     await productManager.deleteProduct(4);
// }

// Llamo a test
// test();

export default ProductManager;