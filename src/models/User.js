import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
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
        tickets: [], 
        coupons: [
            {
                type: String,
            }], 
    },
    {
        collection: 'User'
    }
)

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;