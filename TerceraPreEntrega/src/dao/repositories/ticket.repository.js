import TicketDTO from "../../dtos/ticket.dto.js";

export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getTicketById(tId) {
    const result = await this.dao.getTicketById(tId)
    return result
  }
  
  async addTicket(ticketData) {
    const result = await this.dao.addTicket(ticketData)
    return result
  }
}