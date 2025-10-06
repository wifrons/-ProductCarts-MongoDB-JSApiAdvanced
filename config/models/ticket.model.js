import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        subtotal: { type: Number }
    }]
}, { versionKey: false });

export const TicketModel = mongoose.model("Ticket", ticketSchema);