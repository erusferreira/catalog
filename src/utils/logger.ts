import pino from 'pino';
import pretty from 'pino-pretty';

import * as config from "../config/config";

export const logger = pino({
  name: config.LOG_APP_ID,
  level: config.LOG_LEVEL || "error",
}, pretty({colorize: true}));
