import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const MailerService = {

    sendPurchaseConfirmation: async (to, ticket) => {
        const mailOptions = {
            from: `"Inversiones Coremar" <${process.env.EMAIL_USER}>`,
            to,
            subject: `Confirmación de compra - Ticket ${ticket.code}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2c3e50;">Gracias por tu compra</h2>
        <p>Ticket: <strong>${ticket.code}</strong></p>
        <p>Total: <strong>$${ticket.amount.toFixed(2)}</strong></p>
        <p>Fecha: ${new Date(ticket.purchase_datetime).toLocaleString()}</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
            <tr style="background-color: #f2f2f2;">
                <th style="border: 1px solid #ddd; padding: 8px;">Title</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            ${ticket.products.map(p => `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${p.title || p.product}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${p.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">
                    ${typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : '—'}
                </td>
                <td style="border: 1px solid #ddd; padding: 8px;">$${p.subtotal.toFixed(2)}</td>
            </tr>
            `).join('')}
        </tbody>
        </table>

        <p style="margin-top: 20px;">¡Esperamos verte pronto!</p>
        </div>`
        };

        await transporter.sendMail(mailOptions);
    },
    SendCustomEmail: async (to, subject, html) => {
        const mailOptions = {
            from: `"Inversiones Coremar" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        };
        await transporter.sendMail(mailOptions);
    }
};