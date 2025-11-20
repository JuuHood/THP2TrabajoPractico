import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";

const authRouter = Router();

// Public routes
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

export { authRouter };