import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createEvent, getAllEvent, getEventDetail, publisherDeleteEvent, publisherGetAllEvent, publisherGetEventDetail, publisherUpdateEvent } from "../controllers/event.controller.js";
import {checkRole} from "../middlewares/checkRole.js";
const eventRouter = express.Router();

eventRouter.post("/create-event",verifyToken, checkRole('PUBLISHER'), createEvent);
eventRouter.get("/all-event-publisher",verifyToken, checkRole('PUBLISHER'), publisherGetAllEvent);
eventRouter.get("/event-detail-publisher/:eventId",verifyToken, checkRole('PUBLISHER'), publisherGetEventDetail);
eventRouter.post("/all-event", getAllEvent);
eventRouter.get("/event-detail/:eventId", getEventDetail);
eventRouter.put("/update-event", verifyToken, checkRole('PUBLISHER'), publisherUpdateEvent);
eventRouter.post("/delete-event", verifyToken, checkRole('PUBLISHER'), publisherDeleteEvent);

export default eventRouter;