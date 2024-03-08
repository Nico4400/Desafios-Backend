export default class TicketMemory {
    constructor() {
      this.tickets = [];
    }
  
    async getTicketById(id) {
      const ticket = this.tickets.find(ticket => ticket._id === id);
      if (ticket) {
        return { message: "OK", rdo: ticket };
      } else {
        return { message: "ERROR", rdo: "El ticket no existe" };
      }
    }
  
    async addTicket(ticket) {
      try {
        this.tickets.push(ticket);
        return { message: "OK", rdo: ticket._id };
      } catch (error) {
        console.error("Error al agregar el ticket:", error);
        return { message: "ERROR", rdo: "Error al agregar el ticket" };
      }
    }
}