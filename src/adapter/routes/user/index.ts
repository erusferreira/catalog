import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

import { UserController } from '../../../adapter/controller/user';
import { isAuthenticated } from '../../../core/usecase/auth/auth.middleware';

const userRouter = Router();
const userController = container.resolve(UserController);
userRouter.get('/users', isAuthenticated,  (req: Request, res: Response) => userController.listAll(req, res));

export default userRouter;
