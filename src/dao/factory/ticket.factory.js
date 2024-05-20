import mongoose from "mongoose";
import { getVariables } from "../../config/config.js";

const options = { opts: () => ({ mode: process.env.NODE_ENV }) };
const { MONGO_URL, persistence } = getVariables(options);

let Tickets;

switch (persistence) {
    case 'MONGO':
        const { default: TicketManager } = await import("../managers/TicketManager.js");
        mongoose.connect(MONGO_URL);
        Tickets = TicketManager;
        break;

    case 'MEMORY':
        const { default: TicketMemory } = await import('../memory/ticket.memory.js');
        Tickets = TicketMemory;
        break;
}

export default Tickets;