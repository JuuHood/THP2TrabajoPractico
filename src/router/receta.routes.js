import { Router } from "express";
import { RecetaController } from "../controller/receta.controller.js";
import { authenticateToken } from "../middleware/basicAuth.js";

const recetaRouter = Router();

// Apply authentication to all recipe routes
recetaRouter.use(authenticateToken);

// Rutas específicas primero
recetaRouter.delete("/all", RecetaController.deleteAllRecetas);
recetaRouter.get("/exportar", RecetaController.recetaExportar);

// CRUD de recetas
recetaRouter.get("/", RecetaController.recetaGetAll);
recetaRouter.get("/:id", RecetaController.recetaGetById);
recetaRouter.post("/", RecetaController.recetaCreateNew);
recetaRouter.put("/:id", RecetaController.recetaUpdateById);
recetaRouter.delete("/:id", RecetaController.recetaDeleteOne);


export { recetaRouter };