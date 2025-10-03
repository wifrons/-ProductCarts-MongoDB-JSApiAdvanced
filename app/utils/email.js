import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // o 'Mailgun', 'SendGrid', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export default async function sendEmail(to, subject, html) {
    const mailOptions = {
        from: `"Trend INGENIERIA" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
}
