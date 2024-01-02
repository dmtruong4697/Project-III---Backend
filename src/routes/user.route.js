import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {getUserProfileDetail, updateUserProfileDetail } from "../controllers/user.controller.js";
import {checkRole} from "../middlewares/checkRole.js";
const userRouter = express.Router();

userRouter.post("/user-profile", verifyToken,/*checkRole('PUBLISHER'),*/ getUserProfileDetail);
userRouter.post("/update-user-profile",verifyToken, updateUserProfileDetail);


export default userRouter;