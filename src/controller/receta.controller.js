import path from "node:path";
import { fileURLToPath } from "node:url";
import { RecetaService } from "../services/receta.services.js";

// Estas dos líneas nos permiten usar __dirname en módulos ES (import/export)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const RecetaController = {
	recetaCreateNew: async (req, res) => {
		try {
			//ID del usuario que viene del token JWT (authenticateToken)
			const usuarioId = req.user?.id;

			if (!usuarioId) {
				return res.status(401).json({
					payload: null,
					message: "Usuario no autenticado",
					ok: false,
				});
			}

			const { nombre, ingredientes, instrucciones } = req.body;

			if (!nombre || !ingredientes || !instrucciones) {
				return res.status(400).json({
					payload: null,
					message: "Nombre, ingredientes e instrucciones son requeridos",
					ok: false,
				});
			}

			const recetaData = {
				nombre,
				ingredientes,
				instrucciones,
				usuario_id: usuarioId,
			};

			const response = await RecetaService.serviceRecetaCreation(recetaData);

			if (!response) {
				return res.status(400).json({
					payload: null,
					message: "Datos inválidos o error al crear la receta",
					ok: false,
				});
			}

			return res.status(201).json({
				message: "Creado correctamente",
				payload: { ...response, id: response.id },
				ok: true,
			});
		} catch (e) {
			console.error(e);
			return res.status(500).json({
				payload: null,
				message: "Error inesperado al crear la receta",
				ok: false,
			});
		}
	},

	recetaGetAll: async (_req, res) => {
		try {
			const recetas = await RecetaService.serviceGetAll();

			// Si el service devuelve null, fue un error real (Supabase falló)
			if (recetas === null) {
				return res.status(500).json({
					message: "Error al leer las recetas",
					payload: null,
					ok: false,
				});
			}

			// Si no hay recetas, devolvemos lista vacía pero ok = true
			return res.status(200).json({
				message: "Success",
				payload: recetas, // puede ser [] o array con recetas
				ok: true,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: "Error al leer las recetas",
				payload: null,
				ok: false,
			});
		}
	},

	recetaGetById: async (req, res) => {
		const { id } = req.params;
		const receta = await RecetaService.serviceRecetaValidation(id);

		if (!receta) {
			return res.status(404).json({
				message: "Error, no existe la receta",
				payload: null,
				ok: false,
			});
		}

		return res.status(200).json({
			message: "Success",
			payload: receta,
			ok: true,
		});
	},

	getEstadisticas: async (_req, res) => {
		try {
			const estadisticas = await RecetaService.getEstadisticas();
			res.status(200).json(estadisticas);
		} catch (error) {
			console.error("Error al obtener estadísticas:", error);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	},

	recetaDeleteOne: async (req, res) => {
		const { id } = req.params;
		const receta = await RecetaService.serviceRecetaValidation(id);
		const idReceta = await RecetaService.serviceRecetaDelete(id);

		if (!idReceta) {
			return res.status(404).json({
				payload: null,
				message: "No se encontró la receta a borrar",
				ok: false,
			});
		}

		return res.status(200).json({
			message: "Receta borrada satisfactoriamente",
			payload: receta,
			ok: true,
		});
	},

	recetaUpdateById: async (req, res) => {
		const { id } = req.params;
		const newData = req.body;

		const recetaUpdated = await RecetaService.serviceUpdateReceta(id, newData);

		if (!recetaUpdated) {
			return res.status(404).json({
				ok: false,
				payload: null,
				message: "Fallo al actualizar la receta",
			});
		}

		return res.status(200).json({
			message: "Receta modificada",
			payload: recetaUpdated,
			ok: true,
		});
	},

	recetaExportar: async (_req, res) => {
		try {
			const filePath = await RecetaService.exportarRecetas();

			if (!filePath) {
				return res.status(404).json({
					message: "No hay recetas para exportar",
					payload: null,
					ok: false,
				});
			}

			const absolutePath = path.resolve(
				__dirname,
				"..",
				filePath.replace("./src/", ""),
			);
			return res.download(absolutePath, "recetas.csv");
		} catch (error) {
			console.error("Error al exportar recetas:", error);
			return res.status(500).json({
				message: "Error inesperado al exportar recetas",
				payload: null,
				ok: false,
			});
		}
	},

	deleteAllRecetas: async (_req, res) => {
		if (process.env.NODE_ENV !== "test") {
			return res.status(403).json({
				ok: false,
				message: "No autorizado fuera de entorno de testing",
				payload: null,
			});
		}

		try {
			const recetas = await RecetaService.serviceGetAll();
			await RecetaService.deleteAll();
			return res.status(200).json({
				ok: true,
				message: "Recetas eliminadas exitosamente",
				payload: recetas,
			});
		} catch (error) {
			console.error("Error al borrar todas las recetas:", error);
			return res.status(500).json({
				ok: false,
				message: "Error interno al borrar recetas",
				payload: null,
			});
		}
	},
};
