import mongoose, { Schema, model } from "mongoose";

const TicketSchema = new Schema(
    {
        eventId: {
            type: String,
            //required: true,
        },
        status: {
            type: String,
            //required: true,
        },
        ownerId: {
            type: String,
            //required: true,
        },
        price: {
            type: String,
            //required: true,
        },
        type: {
            type: String,
        },
        description: [
        {
            type: String,
        }], 
    },
    {
        collection: 'Ticket'
    }
)

const TicketModel = mongoose.model("Ticket", TicketSchema);
export default TicketModel;