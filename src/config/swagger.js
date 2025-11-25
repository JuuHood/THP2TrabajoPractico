import path from "node:path";
import { fileURLToPath } from "node:url";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar la especificación OpenAPI desde el archivo YAML en docs/
const swaggerDocument = YAML.load(
	path.join(__dirname, "../../docs/openapi.yaml"),
);

export { swaggerUi, swaggerDocument as swaggerSpec };
