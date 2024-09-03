import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
    },
});

const Ticket = model("Ticket", ticketSchema);

export default Ticket;