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
			recetaData.usuario_id,
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

	// Este método obtiene estadísticas de las recetas:
	// - total de recetas
	// - cantidad de recetas por usuario
	// - top 3 usuarios con más recetas
	getEstadisticas: async () => {
		const recetas = await RecetaRepository.getAll();
		const totalRecetas = recetas.length;

		// Cantidad de recetas por usuario
		const recetasPorUsuario = {};

		for (const r of recetas) {
			const usuario = r.usuario_id || "Desconocido";
			recetasPorUsuario[usuario] = (recetasPorUsuario[usuario] || 0) + 1;
		}

		// Convertir a array para ordenar
		const topUsuarios = Object.entries(recetasPorUsuario)
			.map(([usuario, cantidad]) => ({ usuario, cantidad }))
			.sort((a, b) => b.cantidad - a.cantidad) // de mayor a menor
			.slice(0, 3); // top 3, podés cambiarlo

		return {
			totalRecetas,
			recetasPorUsuario,
			topUsuarios,
		};
	},

	// Exportar todas las recetas a CSV
	exportarRecetas: async () => {
		const recetas = await RecetaRepository.getAll();
		if (!recetas || recetas.length === 0) return null;

		const fields = ["id", "nombre", "ingredientes", "instrucciones"];
		const { Parser } = await import("json2csv");
		const fs = await import("node:fs/promises");

		const parser = new Parser({ fields });
		const csv = parser.parse(recetas);

		const filePath = "./src/utils/recetas_export.csv";
		await fs.writeFile(filePath, csv);

		return filePath;
	},

	// Eliminar todas las recetas
	deleteAll: async () => {
		return await RecetaRepository.deleteAll();
	},
};
