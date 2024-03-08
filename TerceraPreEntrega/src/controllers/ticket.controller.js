import { ticketService } from "../dao/repositories/index.repository.js";

export const getTicketById = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const response = await ticketService.getTicketById(ticketId);
        if (response.message === "OK") {
            return res.status(200).json(response.rdo);
        } else {
            return res.status(404).json({ message: "Ticket not found", response });
        }
    } catch (error) {
        console.error("Error retrieving ticket:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createTicket = async (req, res) => {
    try {
        const { code, purchase_datetime, amount, purchaser } = req.body;
        const ticketData = { code, purchase_datetime, amount, purchaser };
        const response = await ticketService.addTicket(ticketData);
        if (response.message === "OK") {
            return res.status(201).json({ message: "Ticket created successfully", ticketId: response.rdo });
        } else {
            return res.status(400).json({ message: "Failed to create ticket" ,response});
        }
    } catch (error) {
        console.error("Error creating ticket:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};