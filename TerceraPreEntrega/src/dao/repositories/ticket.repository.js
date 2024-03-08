import TicketDTO from "../../dtos/ticket.dto.js";

export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getTicketById(ticketId) {
    try {
      const ticket = await this.dao.getTicketById(ticketId);
      if (ticket) {
        return { message: "OK", rdo: ticket };
      } else {
        return { message: "ERROR", rdo: "El ticket no existe" };
      }
    } catch (error) {
      return { message: "ERROR", rdo: "Error al obtener el ticket solicitado - " + error.message, ticketId };
    }
  }

  async addTicket(ticketData) {
    try {
      const newTicket = new TicketDTO(ticketData);
      const addedTicketId = await this.dao.addTicket(newTicket);
      return { message: "OK", rdo: addedTicketId };
    } catch (error) {
      return { message: "ERROR", rdo: "Error al agregar el ticket: " + error.message };
    }
  }
}