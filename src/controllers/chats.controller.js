// import { ChatManager } from "../dao/managers/ChatManager.js";
import { chatService } from "../dao/repositories/index.repository.js";

export const getChats = async (req, res) => {
    try {
        const { limit } = req.query;
        const response = await chatService.getChats();
        if (response.message === "OK") {
            if (!limit) {
                return res.status(200).json(response);
            }
            const chatsLimit = response.rdo.slice(0, limit);
            return res.status(200).json(chatsLimit);
        }
        res.status(400).json(response);
    } catch (err) {
        res.status(400).json({ message: "Error al obtener los mensajes - " + err.message });
    }
};
  
export const postChat = async (req, res) => {  
    try {
        const newChat = req.body;
        const response = await chatService.addChat(newChat);
        if (response.message === "OK") {
            return res.status(200).json(response);
        }
        res.status(400).json(response);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};
  
export const deleteChat = async (req ,res) => {
    try {
        const { chId } = req.params;
        const response = await chatService.deleteChat(chId);
        if (response.message === "OK") {
            return res.status(200).json(response.rdo);
        }
        return res.status(404).json(response.rdo);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};