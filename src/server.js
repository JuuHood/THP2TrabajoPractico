import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/config.js";
import dotenv from "dotenv";
import recetasRoutes from "./routes/receta.routes.js";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

// Middleware custom de logs (según flag ENABLE_LOGS)
//if (process.env.ENABLE_LOGS !== "false") {
  //app.use(requestLogger);//
//}


// manejo de rutas//
app.use("/api/recetas", recetasRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(process.env.PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  await connectDB();
});