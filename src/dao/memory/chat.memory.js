export default class ChatMemory {
    constructor() {
        this.chats = [];
    }

    async getChats() {
        try {
            return { message: "OK", rdo: this.chats };
        } catch (error) {
            return { message: 'ERROR', rdo: "No se pudieron obtener los mensajes correctamente" };
        }
    }

    async addChat(chat) {
        try {
            if (!chat.user || !chat.message) {
                return { message: "ERROR", rdo: "Faltan datos en el mensaje" };
            }
            this.chats.push(chat);
            return { message: "OK", rdo: "Mensaje dado de alta correctamente" };
        } catch (error) {
            return { message: 'ERROR', rdo: "Error al dar de alta el mensaje - " + error.message };
        }
    }

    async deleteChat(id) {
        try {
            const index = this.chats.findIndex(chat => chat._id === id);
            if (index === -1) {
                return { message: "ERROR", rdo: `No se encontró el mensaje con el ID ${id}. No se pudo eliminar.` };
            }
            this.chats.splice(index, 1);
            return { message: "OK", rdo: `Mensaje con ID ${id} eliminado exitosamente.` };
        } catch (error) {
            return { message: 'ERROR', rdo: "Error al eliminar el mensaje - " + error.message };
        }
    }
}