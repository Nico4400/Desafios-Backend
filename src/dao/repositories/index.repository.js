import Users from "../factory/user.factory.js";
import Chats from "../factory/chat.factory.js";
import Products from "../factory/product.factory.js";
import Carts from "../factory/cart.factory.js";
import Ticket from "../factory/ticket.factory.js"

import UserRepository from "./user.repository.js";
import ChatRepository from "./chat.repository.js";
import ProductRepository from "./product.repository.js";
import CartRepository from "./cart.repository.js";
import TicketRepository from "./ticket.repository.js";

export const userService = new UserRepository(new Users());
export const chatService = new ChatRepository(new Chats());
export const productService = new ProductRepository(new Products());
export const cartService = new CartRepository(new Carts());
export const ticketService = new TicketRepository(new Ticket());
