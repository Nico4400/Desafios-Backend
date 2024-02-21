import { chatModel } from "../dao/models/chat.model.js";


export class ChatManager {
    async getChats() {
        try {
            const parseChats = await chatModel.find().lean()
            return {message: "OK" , rdo: parseChats}
        } catch (e) {
            return {message: "ERROR" , rdo: "No hay mensajes"}
        }
    }
  
    async addChat(chat){
        try{
            const validation = !chat.user || !chat.message ? false : true;
            if (!validation)
                return {message: "ERROR" , rdo: "Faltan datos en el mensaje"}    
            const added = await chatModel.create(chat);
            return {message: "OK" , rdo: "Mensaje dado de alta correctamente"}
        } catch (err) {
            res.status(400).json({ message: "Error al dar de alta el mensaje - " + err.menssage })
        }
    }
  
    async deleteChat(id) {
        try {
            const deleted = await chatModel.deleteOne({_id: id});    
            if (deleted.deletedCount === 0) {
                return {message: "ERROR" , rdo: `No se encontró el mensaje con el ID ${id}. No se pudo eliminar.`}
            }    
            return {message: "OK" , rdo: `Mensaje con ID ${id} eliminado exitosamente.`}
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al momento de eliminar el mensaje - "+ e.message}
        }
    }
}