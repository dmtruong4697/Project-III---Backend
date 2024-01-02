import { secret } from "../config/auth.config.js";
import UserModel from "../models/User.js";
import Jwt from "jsonwebtoken";

const getUserProfileDetail = async (req, res) => {
    try {
        const user = await UserModel.findById(req.id);
        if (!user) {
            res.status(404).json({ message: "Người dùng không tồn tại" + req.id});
        } else {
             res.json({ user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi trong quá trình lấy thông tin người dùng" });
    }
};

const updateUserProfileDetail = async (req, res) => {
    try {
        const user = await UserModel.findById(req.id);

        if (!user) {
            res.status(404).json({ message: "Người dùng không tồn tại" });
        } else {
            const { userName, password, email, phoneNumber, tickets } = req.body;

            if (userName) user.userName = userName;
            if (phoneNumber) user.phoneNumber = phoneNumber;
            if (email) user.email = email;

            if (tickets) {
                if (!user.tickets) {
                    user.tickets = [];
                }
                
                user.tickets = user.tickets.concat(tickets);
            }

            await user.save();

            res.json({ message: "Thông tin người dùng đã được cập nhật" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi trong quá trình cập nhật thông tin người dùng" });
    }
};


export {getUserProfileDetail, updateUserProfileDetail};
