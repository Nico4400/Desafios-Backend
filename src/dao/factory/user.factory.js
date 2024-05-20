import mongoose from "mongoose";
import { getVariables } from "../../config/config.js";
import processOptions from "../../utils/process.js";

// const options = { opts: () => ({ mode: process.env.NODE_ENV }) };
const { MONGO_URL, persistence } = getVariables(processOptions);


let Users;

switch (persistence) {
    case 'MONGO':
        const { default: UserManager } = await import('../managers/UserManager.js');
        mongoose.connect(MONGO_URL);
        Users = UserManager;
        break;

    case 'MEMORY':
        const { default: UserMemory } = await import('../memory/user.memory.js');
        Users = UserMemory;
        break;
}

export default Users;