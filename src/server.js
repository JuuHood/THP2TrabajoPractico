// server.js

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { authRouter } from "./router/auth.routes.js";
import { recetaRouter } from "./router/receta.routes.js";

dotenv.config();
const app = express();

// 🔹 Seguridad
app.use(helmet());
app.use(cors());

// 🔹 Logging (primero el logger propio → Supabase)
app.use(requestLogger);
app.use(morgan("dev"));

// 🔹 Parsers
app.use(express.json());
app.use(express.static("public"));

app.get("/", (_req, res) => {
	res.json({
		message: "API Recetas funcionando correctamente ",
		status: "ok",
	});
});

// 🔹 Rate limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: "Demasiadas solicitudes desde esta IP, intenta luego.",
});
app.use(limiter);

// 🔹 Documentación API
app.use(
	"/api/docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, {
		customCss: ".swagger-ui .topbar { display: none }",
		customSiteTitle: "API Recetas - Documentación",
	}),
);

// 🔹 Rutas
app.use("/api/auth", authRouter);
app.use("/api/recetas", recetaRouter);

// 🔹 404
app.use((_req, res) => {
	res.status(404).json({ error: "Ruta no encontrada" });
});

// 🔹 Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
