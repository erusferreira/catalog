import express from "express";

import { logger } from "./logger";
import { BusinessError, AuthError, AuthForbiddenError } from "./errors";

export const errorHandler = (error: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  logger.error(error);
  let status = 500;
  let message = error.message;
  if (error instanceof BusinessError) {
    status = 400;
  }
  if (error instanceof AuthError) {
    status = 401;
    message = "Unauthorized";
  }
  if (error instanceof AuthForbiddenError) {
    status = 403;
    message = "Forbidden";
  }
  res.status(status).send(message);
};