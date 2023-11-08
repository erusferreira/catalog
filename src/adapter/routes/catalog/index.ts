import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import { CatalogController } from "@adapter/controller/catalog";

const catalogRouter = Router();
const catalogController = container.resolve(CatalogController);
catalogRouter.get('/catalogs', (req: Request, res: Response) => catalogController.listAll(req, res));
catalogRouter.get('/catalog/:id', (req: Request, res: Response) => catalogController.findById(req, res));
catalogRouter.post('/catalogs', (req: Request, res: Response) => catalogController.create(req, res));
catalogRouter.put('/catalog/:id', (req: Request, res: Response) => catalogController.update(req, res));
catalogRouter.delete('/catalog/:id', (req: Request, res: Response) => catalogController.delete(req, res));

export default catalogRouter;


