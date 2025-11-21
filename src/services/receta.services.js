// src/services/receta.service.js
import { Receta } from "../models/receta.model.js";
import { RecetaRepository } from "../repository/receta.repository.js";

export const RecetaService = {
  // Alias for compatibility
  get serviceRecetaCreation() { return this.serviceRecetaCreate; },
  get serviceGetAll() { return this.serviceGetAllRecetas; },
};

export const recetaService = RecetaService;

const RecetaServiceObj = {
  // Valida que exista la receta por ID
  serviceRecetaValidation: async (id) => {
    const receta = await RecetaRepository.getById(id);
    if (!receta) return null;
    return receta;
  },

  // Obtener todas las recetas
  serviceGetAllRecetas: async () => {
    const recetas = await RecetaRepository.getAll();
    if (!recetas || recetas.length === 0) return null;
    return recetas;
  },

  // Crear una nueva receta
  serviceRecetaCreate: async (recetaData) => {
    const createdReceta = await RecetaRepository.create({
      nombre: recetaData.nombre,
      ingredientes: recetaData.ingredientes,
      instrucciones: recetaData.instrucciones,
    });

    if (!createdReceta) return null;
    return createdReceta;
  },

  // Eliminar receta por ID
  serviceRecetaDelete: async (id) => {
    const deleted = await RecetaRepository.deleteById(id);
    if (!deleted) return null;
    return deleted;
  },

  // Actualizar receta por ID
  serviceUpdateReceta: async (id, newData) => {
    const recetaActualizada = await RecetaRepository.updateById(id, newData);
    if (!recetaActualizada) return null;
    return recetaActualizada;
  },

  // Exportar recetas a CSV
  exportarRecetas: async () => {
    const recetas = await RecetaRepository.getAll();
    if (!recetas || recetas.length === 0) return null;

    const fields = ["id", "nombre", "ingredientes", "instrucciones"];

    const { Parser } = await import("json2csv");
    const fs = await import("fs/promises");

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(recetas);

    const filePath = "./src/utils/recetas_export.csv";
    await fs.writeFile(filePath, csv);

    return filePath;
  },

  // Eliminar todas las recetas
  deleteAll: async () => {
    return await RecetaRepository.deleteAll();
  },
};
