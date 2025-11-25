import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(" ")[1]; // Bearer TOKEN

	if (!token) {
		return res.status(401).json({ error: "Token de acceso requerido" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ error: "Token inválido o expirado" });
		}
		req.user = user; // Adjuntar info de usuario a la request
		next();
	});
};

// Opcional: Middleware para verificar roles
export const authorizeRole = (requiredRole) => {
	return (req, res, next) => {
		if (!req.user || req.user.role !== requiredRole) {
			return res.status(403).json({ error: "Permisos insuficientes" });
		}
		next();
	};
};
