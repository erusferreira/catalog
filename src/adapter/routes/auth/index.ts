import { Router, Request, Response } from "express";
import { container } from "tsyringe";

import { AuthController } from '../../../adapter/controller/auth';

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post('/auth/signup', (req: Request, res: Response) => authController.signup(req, res));
authRouter.post('/auth/login', (req: Request, res: Response) => authController.login(req, res));

export default authRouter;
