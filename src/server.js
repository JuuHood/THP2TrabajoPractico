// server.js
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { recetaRouter } from "./router/receta.routes.js";
import { authRouter } from "./router/auth.routes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

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

// 🔹 Rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas solicitudes desde esta IP, intenta luego."
});
app.use(limiter);

// 🔹 Documentación API
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API Recetas - Documentación",
}));

// 🔹 Rutas
app.use("/api/auth", authRouter);
app.use("/api/recetas", recetaRouter);

// 🔹 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// 🔹 Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
