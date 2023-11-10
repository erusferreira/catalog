import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import { CategoryController } from "@adapter/controller/category";
import { isAuthenticated } from "@core/usecase/auth/auth.middleware";

const categoryRouter = Router();
const categoryController = container.resolve(CategoryController);
categoryRouter.get('/categories', isAuthenticated, (req: Request, res: Response) => categoryController.listAll(req, res));
categoryRouter.get('/category/:id', isAuthenticated, (req: Request, res: Response) => categoryController.findById(req, res));
categoryRouter.post('/categories', isAuthenticated, (req: Request, res: Response) => categoryController.create(req, res));
categoryRouter.put('/category/:id', isAuthenticated, (req: Request, res: Response) => categoryController.update(req, res));
categoryRouter.delete('/category/:id', isAuthenticated, (req: Request, res: Response) => categoryController.delete(req, res));

export default categoryRouter;
