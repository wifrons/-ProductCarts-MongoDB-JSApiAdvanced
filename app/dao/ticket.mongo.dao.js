import { TicketModel } from '../../config/models/ticket.model.js';

export const TicketDAO = {
    createTicket: async (ticketData) => {
        return await TicketModel.create(ticketData);
    },
    findByCode: async (code) => {
        return await TicketModel.findOne({ code });
    },
    findByUser: async (email) => {
        return await TicketModel.find({ purchaser: email });
    }
};