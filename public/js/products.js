const socket = io();

socket.emit('message', 'Hola desde el cliente');

socket.on('recibe_uno', data => {
    console.log(data);
});
socket.on('reciben_todos_menos_uno', data => {
    console.log(data);
});
socket.on('recibe_todos', data => {
    console.log(data);
});

// Funcion para crear productos
function createProduct() {
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productCode = document.getElementById('productCode').value;
    const productPrice = document.getElementById('productPrice').value;
    const productStock = document.getElementById('productStock').value;
    const productCategory = document.getElementById('productCategory').value;
    const productThumbnail = document.getElementById('productThumbnail').value;
    const productOwner = document.getElementById('productOwner').value;

    const productData = {
        title: productName,
        description: productDescription,
        code: productCode,
        price: productPrice,
        stock: productStock,
        category: productCategory,
        thumbnail: productThumbnail,
        owner: productOwner        
    };
    // Emitir un mensaje a través de WebSockets para crear un producto
    socket.emit('create_product', productData);
}

// Funcion para eliminar productos
function deleteProduct() {
    const productIdToDelete = document.getElementById('productIdToDelete').value;
    // Emitir un mensaje a través de WebSockets para eliminar un producto
    socket.emit('delete_product', productIdToDelete);
}

// Solicitar los últimos productos al servidor
socket.emit('get_products');

socket.on('update_products', (products) => {
    // Limpiar la lista de productos
    document.getElementById('productList').innerHTML = "";

    // Actualizar la lista de productos
    const productList = document.getElementById('productList');
    console.log('Type of products:', products.payload);
    products.payload.forEach(product => {
        const listItem = document.createElement('li');
        listItem.classList.add('product');

        const productInfo = `
            <h2>${product._id}</h2>
            <h2>${product.title}</h2>
            <p>Descripción: ${product.description}</p>
            <p>Código: ${product.code}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <img src="${product.thumbnail}" alt="${product.title}" width="100">
        `;
        listItem.innerHTML = productInfo;

        // Agregar el nuevo elemento al principio de la lista
        if (productList.firstChild) {
            productList.insertBefore(listItem, productList.firstChild);
        } else {
            productList.appendChild(listItem);
        }
    });
});