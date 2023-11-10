import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

import { UserController } from '@adapter/controller/user';

const userRouter = Router();
const userController = container.resolve(UserController);
userRouter.get('/users', (req: Request, res: Response) => userController.listAll(req, res));

export default userRouter;
