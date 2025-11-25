import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";

const authRouter = Router();

// Rutas públicas de autenticación
// Documentación completa en: docs/openapi.yaml
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/refresh", AuthController.refresh);

export { authRouter };