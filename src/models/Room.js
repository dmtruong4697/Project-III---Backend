import mongoose, { Schema, model } from "mongoose";

const RoomSchema = new Schema(
    {
        name: {
            type: String,
        },
        publisherId: {
            type: String,
        },
        description: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        seatCount: {
            type: Number,
        },
        createAt: {
            type: Date,
        },
        seats: [],
    },
    {
        collection: 'Room'
    }
)

const RoomModel = mongoose.model("Room", RoomSchema);
export default RoomModel;