import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { GetAllUsersService } from "@core/usecase/user/get-all-users.service";

@injectable()
export class UserController {
  public async listAll(req: Request, res: Response): Promise<unknown> {
    try {
      const userService = container.resolve(GetAllUsersService);
      const users = await userService.execute();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
