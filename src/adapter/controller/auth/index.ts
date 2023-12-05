import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthService } from "@core/usecase/auth/auth.service";
import { CreateUserService } from "@core/usecase/user/create-user.service";
import { logger } from "@adapter/utils/logger";
import { LoginRequest, RegisterRequest } from "@adapter/types/auth-request.interface";
import { AuthError } from "@adapter/utils/errors";

export class AuthController {
  
  public async login(req: Request, res: Response): Promise<unknown> {
    try {
      const userLogin = req.body as LoginRequest;
      const authService = container.resolve(AuthService);
      const authResponse = await authService.login(userLogin);
      return res.status(200).json(authResponse);
    } catch (error: any) {
      if (error instanceof AuthError) {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  public async signup(req: Request, res: Response): Promise<unknown> {
    try {
      const userRegister = req.body as RegisterRequest;
      const createUserService = container.resolve(CreateUserService);
      const authResponse = await createUserService.execute(userRegister);
      return res.status(200).json(authResponse);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
