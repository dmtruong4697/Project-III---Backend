import mongoose, { Schema, model } from "mongoose";

const CheckerSchema = new Schema(
    {
        userName: {
            type: String,
            //required: true,
        },
        password: {
            type: String,
            //required: true,
        },
        publisherId: {
            type: String,
            //required: true,
        },
    },
    {
        collection: 'Checker'
    }
)

const CheckerModel = mongoose.model("Checker", CheckerSchema);
export default CheckerModel;