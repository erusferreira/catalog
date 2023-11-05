import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import { CategoryController } from "../../controller/category";

const categoryRouter = Router();
const categoryController = container.resolve(CategoryController);
categoryRouter.get('/categories', (req: Request, res: Response) => categoryController.listAll(req, res));
categoryRouter.post('/categories', (req: Request, res: Response) => categoryController.create(req, res));

export default categoryRouter;
