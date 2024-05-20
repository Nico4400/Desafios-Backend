import ChatDTO from "../../dtos/chat.dto.js";

export default class ChatRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getChats = async () => {
        const result = await this.dao.getAll();
        return result;
    }

    postChat = async (chatData) => {
        const newChat = new ChatDTO(chatData);
        const result = await this.dao.create(newChat);
        return result;
    }

    deleteChat = async (chatId) => {
        const result = await this.dao.delete(chatId);
        return result;
    }
}