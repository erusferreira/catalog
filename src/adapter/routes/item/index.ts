import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import { ItemController } from "@adapter/controller/item";

const itemRouter = Router();
const itemController = container.resolve(ItemController);
itemRouter.get('/item/:id', (req: Request, res: Response) => itemController.findById(req, res));
itemRouter.post('/items', (req: Request, res: Response) => itemController.create(req, res));
itemRouter.put('/item/:id', (req: Request, res: Response) => itemController.update(req, res));
itemRouter.delete('/item/:id', (req: Request, res: Response) => itemController.delete(req, res));

export default itemRouter;
