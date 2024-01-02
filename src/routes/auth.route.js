import express from "express";
import { userSignUp, userLogin } from "../controllers/auth.controller.js";
import { publisherLogin, publisherSignUp } from "../controllers/auth.controller.js";
import checkDuplicateUsernameOrEmail from "../middlewares/verifySignup.js";
import { checkRole } from "../middlewares/checkRole.js";

const authRouter = express.Router();

authRouter.post("/user-signup", checkDuplicateUsernameOrEmail, userSignUp);
authRouter.post("/user-login", userLogin);

authRouter.post("/publisher-signup", checkDuplicateUsernameOrEmail, publisherSignUp);
authRouter.post("/publisher-login", publisherLogin);

export default authRouter;
