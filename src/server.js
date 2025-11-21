import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { recetaRouter } from "./router/receta.routes.js";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { recetaRouter } from "./router/receta.routes.js";
import { authRouter } from "./router/auth.routes.js";
import { requestLogger } from "./middleware/requestLogger.js";

dotenv.config();
const app = express();

// Middlewares globales
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(requestLogger); // Custom request logging
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

// Rutas
// Limitación de tasa
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limitar cada IP a 100 requests por windowMs
  message: "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde."
});
app.use(limiter);

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/recetas", recetaRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
