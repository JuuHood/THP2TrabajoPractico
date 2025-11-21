import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, '../../logs/requests.log');

export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${req.method} ${req.originalUrl} - IP: ${req.ip}\n`;

  // Log to console
  console.log(logEntry.trim());

  // Log to file (append)
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  next();
};