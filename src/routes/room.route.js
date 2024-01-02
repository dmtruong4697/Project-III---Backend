import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createRoom, deleteRoom, getAllRoom, getRoomDetail, updateRoom } from "../controllers/room.controller.js";
import {checkRole} from "../middlewares/checkRole.js";
const roomRouter = express.Router();

roomRouter.post("/create-room",verifyToken, checkRole('PUBLISHER'), createRoom);
roomRouter.get("/all-room", verifyToken, checkRole('PUBLISHER'), getAllRoom);
roomRouter.post("/room-detail", verifyToken, checkRole('PUBLISHER'), getRoomDetail);
roomRouter.post("/delete-room", verifyToken, checkRole('PUBLISHER'), deleteRoom);
roomRouter.put("update-room", verifyToken, checkRole('PUBLISHER'), updateRoom);

export default roomRouter;