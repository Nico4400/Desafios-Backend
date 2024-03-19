const socket = io();

socket.emit('message', 'Hola desde el cliente');

// Funcion para crear productos
function createChat() {
    const userName = document.getElementById('userName').value;
    const userChat = document.getElementById('userChat').value;

    const chatData = {
        user: userName,
        message: userChat  
    };
    // Emitir un mensaje a través de WebSockets para crear un chat
    socket.emit('create_chat', chatData);
}

socket.on('chatLogs', (chats) => {
    // Limpiar la lista de chat
    document.getElementById('chatList').innerHTML = "";

    // Actualizar la lista de chats
    const chatList = document.getElementById('chatList');
    console.log('Type of chats:', chats.rdo);
    chats.rdo.forEach(chat => {
        const listItem = document.createElement('li');
        listItem.classList.add('chat');

        const chatInfo = `
            <h2>${chat.user}</h2>
            <p>Descripción: ${chat.message}</p>            
        `;
        listItem.innerHTML = chatInfo;
        controllers
        carts.controller.js
        chats.controller.js
        products.controller.js
        sessions.controller.js
        ticket.controller.js
        views.controller.js
        dao
        
        chatList.appendChild(listItem);
    });
});