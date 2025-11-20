import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import { recetaRouter } from "./router/receta.routes.js";

dotenv.config();
const app = express();

// Middlewares globales
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

// Rutas
app.use("/api/recetas", recetaRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
