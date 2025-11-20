import { RecetaService } from "../services/receta.services.js";
// Importamos módulos necesarios para manejar rutas de archivos
import path from "path"; // Para resolver rutas de archivos
import { fileURLToPath } from "url"; // Para obtener la URL del archivo actual

// Estas dos líneas nos permiten usar __dirname en módulos ES (import/export)
const __filename = fileURLToPath(import.meta.url); // Obtiene la ruta completa del archivo actual
const __dirname = path.dirname(__filename); // Extrae el directorio base a partir de esa ruta



export const RecetaController = {
  recetaCreateNew: async (req, res) => {
    const receta = req.body;
    try {
      const response = await recetaService.serviceRecetaCreation(receta);

      if (!response) {
        res.status(400).json({
          payload: null,
          message: "Datos inválidos o error al crear la receta",
          ok: false,
        });
        return;
      }

      res.status(201).json({
        message: "Creado correctamente",
        payload: { ...response, id: response.id },
        ok: true,
      });
      return;
    } catch (e) {
      console.error(e);
      res.status(500).json({
        payload: null,
        message: "Error inesperado al crear la receta",
        ok: false,
      });
    }
  },

  recetaGetAll: async (req, res) => {
    const recetas = await recetaService.serviceGetAll();

    if (!recetas) {
      res.status(404).json({
        message: "Error al leer las recetas",
        payload: null,
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: "Success",
      payload: recetas,
      ok: true,
    });
    return;
  },

  recetaGetById: async (req, res) => {
    const { id } = req.params;
    const receta = await recetaService.serviceRecetaValidation(id);

    if (!receta) {
      res.status(404).json({
        message: "Error, no existe la receta",
        payload: null,
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: "Success",
      payload: receta,
      ok: true,
    });
    return;
  },

  //TODO recetaFavorita: async (req, res) => { 

  recetaDeleteOne: async (req, res) => {
    const { id } = req.params;
    const receta = await recetaService.serviceRecetaValidation(id);
    const idReceta = await recetaService.serviceRecetaDelete(id);

    if (!idReceta) {
      res.status(404).json({
        payload: null,
        message: "No se encontro la receta a borrar",
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: `Receta borrada satisfactoriamente`,
      payload: receta,
      ok: true,
    });
    return;
  },

  recetaUpdateById: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    const recetaUpdated = await recetaService.serviceUpdateReceta(
      id,
      newData
    );

    if (!recetaUpdated) {
      res.status(404).json({
        ok: false,
        payload: null,
        message: "Fallo al actualizar la receta",
      });
      return;
    }

    res.status(200).json({
      message: `Receta modificada`,
      payload: recetaUpdated,
      ok: true,
    });
    return;
  },



  recetaExportar: async (req, res) => {
    try {
      const filePath = await recetaService.exportarRecetas();

      if (!filePath) {
        res.status(404).json({
          message: "No hay recetas para exportar",
          payload: null,
          ok: false,
        });
        return;
      }

      const absolutePath = path.resolve(__dirname, "..", filePath.replace("./src/", ""));
      res.download(absolutePath, "recetas.csv");
      return;
    } catch (error) {
      console.error("Error al exportar recetas:", error);
      res.status(500).json({
        message: "Error inesperado al exportar recetas",
        payload: null,
        ok: false,
      });
      return;
    }
  },
    deleteAllRecetas: async (req, res) => {
    if (process.env.NODE_ENV !== "test") {
      return res.status(403).json({
        ok: false,
        message: "No autorizado fuera de entorno de testing",
        payload: null,
      });
    }

    try {
      const recetas = await recetaService.serviceGetAll();
      await recetaService.deleteAll();
      res.status(200).json({
        ok: true,
        message: "Recetas eliminadas exitosamente",
        payload: recetas,
      });
    } catch (error) {
      console.error("Error al borrar todas las recetas:", error);
      res.status(500).json({
        ok: false,
        message: "Error interno al borrar recetas",
        payload: null,
      });
    }
  },



};