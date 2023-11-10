export const LOG_LEVEL = String(process.env.LOG_LEVEL);
export const CATALOG_SERVER = process.env.CATALOG_SERVER;
export const LOG_APP_ID = process.env.LOG_APP_ID;
export const PINO_HTTP_LOG_LEVEL = process.env.PINO_HTTP_LOG_LEVEL || 'warn';
export const MONGO_URL = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN_SECONDS = Number(String(process.env.JWT_EXPIRES_IN_SECONDS)) || 1800;
