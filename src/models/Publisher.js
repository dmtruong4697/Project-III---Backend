import mongoose, { Schema, model } from "mongoose";

const PublisherSchema = new Schema(
    {
        userName: {
            type: String,
            //required: true,
        },
        password: {
            type: String,
            //required: true,
        },
        email: {
            type: String,
            //required: true,
        },
        phoneNumber: {
            type: String,
            //required: true,
        },
        avaterImage: {
            type: String,
        },
        role: {
            type: String,
            //enum: ["USER", "PUBLISHER", "CHECKER"],
        },
        description: {
            type: String,
        },
        events: [
            {
                type: String,
            }],
    },
    {
        collection: 'Publisher'
    }
)

const PublisherModel = mongoose.model("Publisher", PublisherSchema);
export default PublisherModel;