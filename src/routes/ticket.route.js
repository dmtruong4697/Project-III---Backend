import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { userBuyTicket } from "../controllers/ticket.controller.js";
import {checkRole} from "../middlewares/checkRole.js";
const ticketRouter = express.Router();

ticketRouter.post("/buy-ticket", verifyToken, checkRole('USER'), userBuyTicket);


export default ticketRouter;