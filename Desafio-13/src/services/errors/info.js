export const createProductErrorInfo = (product) => {
    return `
    One or more properties were incomplete or not valid
    List of required properties:
    - title: is required and needs to be a String, received ${typeof product.title}
    - description: is required and needs to be a String, received ${typeof product.description}
    - price: is required and needs to be a Number, received ${typeof product.price}
    - stock: is required and needs to be a Number, received ${typeof product.stock}
    - category: is required and needs to be a String, received ${product.category}.
    - code: must be UNIQUE, is required and needs to be a String, received ${typeof product.code}
    `;
}

export const getProductsErrorInfo = () => {
    return `
    An error has occurred trying to get the products.
    `
}

export const getSingleProductErrorInfo = (product) => {
    return `
    Product not found or value is not valid. 
    Input must be a mongo ObjectId (24 character hex string) and received ${product} (${typeof product})
    `
}

export const getCartErrorInfo = (cart) => {
    return `
    Cart not found or value is not valid. 
    Input must be a mongo ObjectId (24 character hex string) and received ${cart} (${typeof cart})
    `
}