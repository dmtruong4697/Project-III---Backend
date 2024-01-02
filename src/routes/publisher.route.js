import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getPublisherProfileDetail, updatePublisherProfileDetail } from "../controllers/publisher.controller.js";
import {checkRole} from "../middlewares/checkRole.js";
const publisherRouter = express.Router();

publisherRouter.post("/publisher-profile",  getPublisherProfileDetail);
publisherRouter.post("/update-publisher-profile",verifyToken, updatePublisherProfileDetail);


export default publisherRouter;