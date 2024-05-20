import { Router } from 'express';
import { getTicketById, createTicket } from '../controllers/ticket.controller.js';

const ticketRouter = Router();

// Endpoint para obtener un ticket por su ID
ticketRouter.get('/:tId', getTicketById);

// Endpoint para crear un nuevo ticket
ticketRouter.post('/', createTicket);

export default ticketRouter;