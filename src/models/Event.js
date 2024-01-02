import mongoose, { Schema, model } from "mongoose";

const TicketTypeSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    ticketList: [],
});

const EventSchema = new Schema(
    {
        name: {
            type: String,
        },
        publisherId: {
            type: String,
        },
        roomId: {
            type: String,
        },
        description: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        tags: [],
        ticketOpeningTime: {
            type: Date,
        },
        ticketClosingTime: {
            type: Date,
        },
        startTime: {
            type: Date,
        },
        closeTime: {
            type: Date,
        },
        location: {
            type: String,
        },
        tickets: [TicketTypeSchema],
        ticketList: [],
        roomIds: {
            type: String,
        },
    },
    {
        collection: 'Event'
    }
)

const EventModel = mongoose.model("Event", EventSchema);
export default EventModel;