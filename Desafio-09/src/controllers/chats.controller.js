import { ChatManager } from "../dao/managers/ChatManager.js";


export const getChats = async (req, res) => {
    try {
        const { limit } = req.query;
        const chat = new ChatManager();    
        const response = await chat.getChats();    
        if (response.message === "OK") {
            if (!limit) 
                return res.status(200).json(response);    
            const productsLimit = response.rdo.slice(0, limit);
            return res.status(200).json(productsLimit);
        }
        res.status(400).json(response);
    } catch (err) {
        res.status(400).json({ message: "Error al obtener los mensajes - " + err.menssage });
    }
};
  
export const postChat = async (req, res) => {  
    try {
        const chat = new ChatManager();
        const newChat = req.body;
        const response = await chat.addChat(newChat);
        if (response.message === "OK") {
            return res.status(200).json(response);
        }
        res.status(400).json(response);
    } catch(err) {
        res.status(400).json({message: err});
    }
};
  
export const deleteChat = async (req ,res) => {
    try {
        const { chId } = req.params;
        const chat = new ChatManager();
        const response = await chat.deleteChat(chId);
        if (response.message === "OK") {
            return res.status(200).json(response.rdo);
        }
        return res.status(404).json(response.rdo);
    } catch(err) {
        res.status(400).json({menssage: err});
    }
};