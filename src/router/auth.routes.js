import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";

const authRouter = Router();

// Rutas publicas de autenticación
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/refresh", AuthController.refresh);

export { authRouter };