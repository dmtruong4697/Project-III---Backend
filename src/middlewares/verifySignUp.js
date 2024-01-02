import UserModel from "../models/User.js";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Kiểm tra trùng lặp username
        const userWithSameUsername = await UserModel.findOne({
            userName: req.body.userName
        });

        if (userWithSameUsername) {
            return res.status(400).json({ message: "Tên người dùng đã tồn tại" });
        }

        // Kiểm tra trùng lặp email
        const userWithSameEmail = await UserModel.findOne({
            email: req.body.email
        });

        if (userWithSameEmail) {
            return res.status(400).json({ message: "Địa chỉ email đã được sử dụng" });
        }

        next(); // Nếu không có trùng lặp, tiếp tục xử lý middleware tiếp theo
    } catch (error) {
        res.status(500).json({ message:"middleware"+ error.message });
    }
};

export default checkDuplicateUsernameOrEmail;
