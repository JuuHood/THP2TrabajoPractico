// src/services/receta.service.js
import { Receta } from "../models/receta.model.js";
import { RecetaRepository } from "../repository/receta.repository.js";

export const RecetaService = {
  // Validar que exista la receta por ID
  serviceRecetaValidation: async (id) => {
    const receta = await RecetaRepository.getById(id);
    return receta || null;
  },

  // Obtener todas las recetas
  serviceGetAll: async () => {
    const recetas = await RecetaRepository.getAll();
    return recetas && recetas.length > 0 ? recetas : null;
  },

  // Crear una receta nueva
  serviceRecetaCreation: async (recetaData) => {
    const receta = new Receta(
      null,
      recetaData.nombre,
      recetaData.ingredientes,
      recetaData.instrucciones,
      recetaData.usuario_id
    );

    const created = await RecetaRepository.createOne(receta);
    return created || null;
  },

  // Eliminar una receta
  serviceRecetaDelete: async (id) => {
    const deleted = await RecetaRepository.deleteById(id);
    return deleted || null;
  },

  // Actualizar una receta
  serviceUpdateReceta: async (id, newData) => {
    const updated = await RecetaRepository.updateById(id, newData);
    return updated || null;
  },

  // Exportar todas las recetas a CSV
  exportarRecetas: async () => {
    const recetas = await RecetaRepository.getAll();
    if (!recetas || recetas.length === 0) return null;

    const fields = ["id", "nombre", "ingredientes", "instrucciones"];
    const { Parser } = await import("json2csv");
    const fs = await import("fs/promises");

    const parser = new Parser({ fields });
    const csv = parser.parse(recetas);

    const filePath = "./src/utils/recetas_export.csv";
    await fs.writeFile(filePath, csv);

    return filePath;
  },

  // Eliminar todas las recetas
  deleteAll: async () => {
    return await RecetaRepository.deleteAll();
  }
};
