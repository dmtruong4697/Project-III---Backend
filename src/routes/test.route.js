import express from "express";
import UserModel from "../models/User.js";
const testRouter = express.Router();

    /** GET Methods */
    /**
     * @openapi
     * '/test':
     *  get:
     *     tags:
     *     - User Controller
     *     summary: Get a user by username
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */

testRouter.get("/test", async (req, res) => {
  res.send('test');
});

export default testRouter;
