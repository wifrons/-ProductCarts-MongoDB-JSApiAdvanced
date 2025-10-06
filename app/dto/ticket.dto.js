export const TicketDTO = {
    formatTicketResponses: (ticket, message) => ({
        code: ticket.code,
        amount: ticket.amount,
        purchaser: ticket.purchaser,
        products: ticket.products,
        date: ticket.purchase_datetime,
        message
    }),
    formatTicketResponse: (ticket, message) => {
        const enrichedProducts = ticket.products.map(p => ({
            title: p.title || '—',
            price: p.price || 0,
            quantity: p.quantity,
            subtotal: p.subtotal
        }));

        return {
            code: ticket.code,
            amount: ticket.amount,
            purchaser: ticket.purchaser,
            purchase_datetime: ticket.purchase_datetime,
            products: enrichedProducts,
            message
        };
    },

    formatTicketResponsex: (ticket, message) => {
        const enrichedProducts = ticket.products.map(p => {
            return {
                title: p.product.title || p.title || '—',
                price: p.product.price || p.price || 0,
                quantity: p.quantity,
                subtotal: p.subtotal
            };
        });

        return {
            code: ticket.code,
            amount: ticket.amount,
            purchaser: ticket.purchaser,
            purchase_datetime: ticket.purchase_datetime,
            products: enrichedProducts,
            message
        };
    }

};