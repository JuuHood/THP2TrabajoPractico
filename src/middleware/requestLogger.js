import { LogRepository } from "../repository/log.repository.js";

export const requestLogger = async (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    const responseTime = Date.now() - start;

    try {
      await LogRepository.createLog({
        method: req.method,
        endpoint: req.originalUrl,
        status_code: res.statusCode,
        response_time_ms: responseTime,
        ip_address: req.ip,
      });
    } catch (error) {
      console.error("Error al guardar el log:", error.message);
    }
  });

  next();
};
