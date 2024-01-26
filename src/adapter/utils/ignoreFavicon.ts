import { Request, Response, NextFunction } from "express";

export const ignoreFavicon = async(req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
  } catch (error: any) {
    res.status(404).json({message: error.message});
  }
}
