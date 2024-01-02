import { secret } from "../config/auth.config.js";
import PublisherModel from "../models/Publisher.js";
import Jwt from "jsonwebtoken";

const getPublisherProfileDetail = async (req, res) => {
    try {
        const publisher = await PublisherModel.findById(req.body.id, {password: 0});
        if (!publisher) {
            res.status(404).json({ message: "Nhà phát hành không tồn tại" + req.body.id});
        } else {
             res.json({ publisher: publisher });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi trong quá trình lấy thông tin nhà phát hành" });
    }
};

const updatePublisherProfileDetail = async (req, res) => {
    try {

                const publisher = await PublisherModel.findById(req.id);

                if (!publisher) {
                    res.status(404).json({ message: "Nhà phát hành không tồn tại" });
                } else {
                    const { userName, password, email, phoneNumber, avatarImage, description } = req.body;
                    if (userName) publisher.userName = userName;
                    if (phoneNumber) publisher.phoneNumber = phoneNumber;
                    if (password) publisher.password = password;
                    if (email) publisher.email = email;
                    if (avatarImage) publisher.avaterImage = avatarImage;
                    if (description) publisher.description = description;
                    await publisher.save();

                    res.json({ message: "Thông tin nhà phát hành đã được cập nhật" });
                }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi trong quá trình cập nhật thông tin nhà phát hành" });
    }
};

export {getPublisherProfileDetail, updatePublisherProfileDetail};
