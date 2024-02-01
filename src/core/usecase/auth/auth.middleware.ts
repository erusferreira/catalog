import { Request, Response, NextFunction} from "express";
const jwt = require("jsonwebtoken");

import { JWT_SECRET } from "../../../adapter/config/config";
import { AuthError } from "../../../adapter/utils/errors";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      throw new AuthError('Autorização não encontrada');
    }
    const token = req.headers.authorization;

    const decoded: any = await new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (error: any, decoded: any) => {
        if (error) {
          reject(new AuthError('O token de autenticação fornecido expirou. Faça o login novamente para obter um novo token.'));
        } else {
          resolve(decoded);
        }
      });
    });
    
    req.id = decoded.id;
    next();
  } catch (error: any) {
    res.status(401).json({message: new AuthError('Sessão expirada. Faça um novo login').message});
  }
}
