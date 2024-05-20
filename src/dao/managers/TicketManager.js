import ticketModel from "../models/ticket.model.js"

export class TicketManager { 

  async getTicketById(id) {
    try
    {
      const ticket = await ticketModel.findOne({_id: id}).lean()

      if (ticket) 
        return {message: "OK" , rdo: ticket}
      else 
        return {message: "ERROR" , rdo: "El ticket no existe"}
    } 
    catch (e) {
      return {message: "ERROR" , rdo: "Error al obtener el ticket solicitado - " + e.message}
   }
  }
  
  async addTicket(ticket) {
    try {
      const added = await ticketModel.create(ticket)      
      return {message: "OK" , rdo: added}
    } 
    catch (e) {
      return {message: "ERROR" , rdo: "Error al agregar el ticket." + e.message}
    }
  }
}

export default TicketManager;