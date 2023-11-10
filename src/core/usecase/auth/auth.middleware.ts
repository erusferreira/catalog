import { Request, Response, NextFunction} from "express";
const jwt = require("jsonwebtoken");

import { JWT_SECRET } from "@adapter/config/config";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization not found!')
    }
    const token = req.headers.authorization;
    jwt.verify(token, JWT_SECRET, (error: any, decoded: any) => {
      if (error) {
        throw new Error('Invalid JWT')
      }
      req.id = decoded.id;
      next();
    });
  } catch (error: any) {
    next(error);
  }
}
