import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { cancelTicket, checkinTicket, getTicketDetail, userBuyTicket } from "../controllers/ticket.controller.js";
import {checkRole} from "../middlewares/checkRole.js";
const ticketRouter = express.Router();

ticketRouter.post("/buy-ticket", verifyToken, checkRole('USER'), userBuyTicket);
ticketRouter.post("/ticket-detail", verifyToken, getTicketDetail);
ticketRouter.post("/checkin", verifyToken, checkRole('PUBLISHER'), checkinTicket);
ticketRouter.post("/cancel-ticket", verifyToken, checkRole('PUBLISHER'), cancelTicket);

export default ticketRouter;