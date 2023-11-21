// Consigna.
// ✓ Realizar una clase “ProductManager” que gestione un conjunto de productos.

// Aspectos a incluir.
// ✓ Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

// ✓ Cada producto que gestione debe contar con las propiedades:
// - title (nombre del producto)
// - description (descripción del producto)
// - price (precio)
// - thumbnail (ruta de imagen)
// - code (código identificador)
// - stock (número de piezas disponibles)

// Aspectos a incluir.
// ✓ Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
// - Validar que no se repita el campo “code” y que todos los campos sean obligatorios
// - Al agregarlo, debe crearse con un id autoincrementable
// ✓ Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

// ✓ Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
// - En caso de no coincidir ningún id, mostrar en consola un error “Not found”

// Formato del entregable.
// ✓ Archivo de Javascript listo para ejecutarse desde node.


// Defino la Clase
class ProductManager {
  constructor() {
    this.products = []
    this.productIdCounter = 1 // Para generar ids autoincrementables
  }
     
  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que todos los campos obligatorios estén presentes
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock
    ) {
      console.log("Todos los campos son obligatorios.")
      return
    }

    // Validar que el código no se repita
    if (this.products.some((prod) => prod.code === code)) {
      console.log("Ya existe un producto con este código.")
      return
    }

    // Agregar el producto con un id autoincrementable "productIdCounter"
    const newProduct = {
      id: this.productIdCounter++,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    this.products.push(newProduct)
    console.log("Producto agregado:", newProduct)
  }

  // método getProducts
  getProducts() {
    return this.products
  }
  
  // Buscador ID
  getProductById(id) {
    const product = this.products.find((prod) => prod.id === id)

    if (!product) {
      console.log("Producto no encontrado.")
    } else {
      console.log("Producto encontrado:", product)
    }

    return product
  }
}
  

// Productos
const productManager = new ProductManager()

productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25,
)

productManager.addProduct(
  "Producto 1",
  "Descripcion del producto 1",
  19.99,
  "Sin imagen",
  "abc1234",
  50,
)

productManager.addProduct(
  "Producto 2",
  "Descripcion del producto 2",
  29.99,
  "Sin imagen",
  "abc12345",
  30,
)

console.log("Lista de productos:", productManager.getProducts())

productManager.getProductById(1) // Este debería mostrar "Producto encontrado."
productManager.getProductById(2) // Este debería mostrar "Producto encontrado."
productManager.getProductById(4) // Este debería mostrar "Producto no encontrado."