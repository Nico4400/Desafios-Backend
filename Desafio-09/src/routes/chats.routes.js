import { Router } from "express";
import { getChats, postChat, deleteChat } from "../controllers/chats.controller.js"; 


const chatsRouter = Router()

chatsRouter.get("/",  getChats );
  
chatsRouter.post('/', postChat );
  
chatsRouter.delete('/:chId', deleteChat );

export default chatsRouter;