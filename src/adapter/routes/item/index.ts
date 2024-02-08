import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import { ItemController } from "../../../adapter/controller/item";
import { isAuthenticated } from "../../../core/usecase/auth/auth.middleware";

const itemRouter = Router();
const itemController = container.resolve(ItemController);
itemRouter.get('/items', isAuthenticated, (req: Request, res: Response) => itemController.listAll(req, res));
itemRouter.get('/items/category/:id', isAuthenticated, (req: Request, res: Response) => itemController.findAllByCategory(req, res));
itemRouter.get('/items/:id', isAuthenticated, (req: Request, res: Response) => itemController.findById(req, res));
itemRouter.post('/items', isAuthenticated, (req: Request, res: Response) => itemController.create(req, res));
itemRouter.put('/items/:id', isAuthenticated, (req: Request, res: Response) => itemController.update(req, res));
itemRouter.delete('/items/:id', isAuthenticated, (req: Request, res: Response) => itemController.delete(req, res));

export default itemRouter;
