import { Router } from "express";
import { chatModel } from "../dao/models/chat.model.js"


const chatsRouter = Router()


chatsRouter.post('/', async (req, res) => {
    try {
        const newMessage = req.body;
        await chatModel.create(newMessage);
        console.log("Mensaje creado");
        res.status(201).json({message: 'Mensaje creado exitosamente'});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: `No se pudo agregar el mensaje - ${error}`});
    }
});

export default chatsRouter;