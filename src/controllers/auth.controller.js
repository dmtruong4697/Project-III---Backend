import UserModel from "../models/User.js";
import PublisherModel from "../models/Publisher.js";
import { secret } from "../config/auth.config.js";
import Jwt from "jsonwebtoken";

const userSignUp = async (req, res) => {
    try {
        const newUser = new UserModel({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            avatarImage: req.body.avatarImage,
            role: 'USER',
        });

        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
        res.status(500).json({ message: "controller signup " + error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email,
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.password !== req.body.password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = Jwt.sign({ id: user.id, role: user.role  }, secret, {
            expiresIn: 86400,
        });

        res.status(200).json({
            message: "Login success",
            id: user.id,
            userName: user.userName,
            email: user.email,
            role: user.role,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: "controller login " + error.message });
    }
}




const publisherSignUp = async (req, res) => {
    try {
        const newPublisher = new PublisherModel({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            avatarImage: req.body.avatarImage,
            description: req.body.description,
            role: 'PUBLISHER',
        });

        await newPublisher.save();

        res.status(201).json({ message: "Đăng ký nhà phát hành thành công" });
    } catch (error) {
        res.status(500).json({ message: "controller signup " + error.message });
    }
};

const publisherLogin = async (req, res) => {
    try {
        const publisher = await PublisherModel.findOne({
            email: req.body.email,
        });

        if (!publisher) {
            return res.status(401).json({ message: "Publisher not found" });
        }

        if (publisher.password !== req.body.password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = Jwt.sign({ id: publisher.id, role: publisher.role  }, secret, {
            expiresIn: 86400,
        });

        res.status(200).json({
            message: "Login success",
            id: publisher.id,
            userName: publisher.userName,
            email: publisher.email,
            role: publisher.role,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: "controller login " + error.message });
    }
}

export { userLogin, userSignUp, publisherLogin, publisherSignUp};
