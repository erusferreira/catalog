import { Request, Response, NextFunction } from "express";

export function ignoreFavicon(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next();
}
