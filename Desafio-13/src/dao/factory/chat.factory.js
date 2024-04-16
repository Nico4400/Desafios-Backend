import mongoose from "mongoose";
import { getVariables } from "../../config/config.js";
import processOptions from "../../utils/process.js";

// const options = { opts: () => ({ mode: process.env.NODE_ENV }) };
const { MONGO_URL, persistence } = getVariables(processOptions);

let Chats;

switch (persistence) {
    case 'MONGO':
        const { default: ChatManager } = await import('../managers/ChatManager.js');
        mongoose.connect(MONGO_URL);
        Chats = ChatManager;
        break;

    case 'MEMORY':
        const { default: ChatMemory } = await import('../memory/chat.memory.js');
        Chats = ChatMemory;
        break;
}

export default Chats;