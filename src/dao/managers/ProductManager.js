import { productModel } from '../models/product.model.js';
import { userModel } from '../models/user.model.js';
import MailingService from '../../services/mailing/nodemailer.js';


// Declaro la clase.
class ProductManager {    

    async getAllProducts(){
        try {
            const products = await productModel.find().lean()
            return products
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // Obtengo los Productos.
    async getProducts(limit = 10, page = 1, query = '', sort = '') {
        try {
            const [ code , value ] = query.split(':');

            const parseProducts = await productModel.paginate({[code] : value}, {
                limit,
                page,
                sort : sort ? {price: sort} : {}
            });
            parseProducts.payload = parseProducts.docs;
            delete parseProducts.docs;
            return { message: 'OK', ...parseProducts}
        } catch (error) {
            return { message: 'ERROR', rdo: `Error al obtener los productos - ${error.message}` }
        }
    }

    // Metodo para agregar Productos.
    async addProduct(product){
        try {
            // let prod = [];
            //Validacion de los campos
            const validacion =
                !product.title ||
                !product.description ||
                !product.code ||
                !product.price ||
                !product.stock ||
                !product.category ||
                !product.thumbnail ? false : true;

            if(!validacion)
                return {message: "ERROR" , rdo: "Faltan datos en el producto a ingresar!"}
                        
            const products = await this.getProducts();

            if (products.message !== "OK") {
                return { message: "ERROR", rdo: "No se pudieron obtener los productos correctamente" };
            }
            const productArray = Array.isArray(products.rdo) ? products.rdo : [];

            const prod = productArray.find((e) => e.code === product.code);

            if (prod) {
                return { message: "ERROR", rdo: "Producto con código existente!" };
            } else {
                const added = await productModel.create(product);
                return { message: "OK", rdo: "Producto dado de alta correctamente", added };
            }
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al agregar el producto - " + e.message}
        }        
    }

    // Busco Prod por ID.
    async getProductById(id) {
        try {
            const prod = await productModel.findOne({_id: id});
            if (prod) {
                return {message: "OK" , rdo: prod}
            } else {
                return {message: "ERROR" , rdo: "El productos no existe"}
            }
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al obtener el producto - " + e.message}            
        }
    }

    // Borro Prod según ID.
    async deleteProduct(id) {
        try {
            // Buscar el producto para obtener su propietario
            const product = await productModel.findById(id).populate('owner');
            if (!product) {
                return {message: "ERROR", rdo: `No se encontró un producto con el ID ${id}. No se pudo eliminar.`};
            }

            // Eliminar el producto
            const deleted = await productModel.deleteOne({_id: id});
            if (deleted.deletedCount === 0) {
                return {message: "ERROR", rdo: `No se encontró un producto con el ID ${id}. No se pudo eliminar.`};
            }

            // Verificar si el propietario es un usuario premium
            const owner = product.owner;
            if (owner.role === 'premium') {
                try {
                    const mailingService = new MailingService();
                    await mailingService.sendSimpleMail({
                        from: 'E-commerce',
                        to: owner.email,
                        subject: 'Notificación de eliminación de producto',
                        html: `
                            <div>
                                <h1>Hola ${owner.first_name}</h1>
                                <p>Tu producto con el título "${product.title}" ha sido eliminado de nuestra plataforma.</p>
                            </div>
                        `,
                    });
                } catch (error) {
                    console.error(`Error al enviar correo electrónico a ${owner.email}:`, error);
                }
            }

            return {message: "OK", rdo: `Producto con ID ${id} eliminado exitosamente.`};
        } catch (e) {
            return {message: "ERROR", rdo: "Error al momento de eliminar el producto - " + e.message};
        }
    }

    // Metodo para Actualizar Productos.
    async updateProduct(id, updateProduct) {
        try {
            const update = await productModel.updateOne({_id: id}, updateProduct);    
            if (update.modifiedCount > 0) {
                return {message: "OK" , rdo: `Producto con ID ${id} actualizado exitosamente.`}
            } else {
                return {message: "ERROR" , rdo: `No se encontró un producto con el ID ${id}. No se pudo actualizar.`} 
            }            
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al momento de actualizar el producto - "+ e.message}
        }
    }
}

export default ProductManager;