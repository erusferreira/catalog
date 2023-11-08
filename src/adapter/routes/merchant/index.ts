import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import { MerchantController } from "@adapter/controller/merchant";

const merchantRouter = Router();
const merchantController = container.resolve(MerchantController);
merchantRouter.get('/merchants', (req: Request, res: Response) => merchantController.listAll(req, res));
merchantRouter.get('/merchant/:id', (req: Request, res: Response) => merchantController.findById(req, res));
merchantRouter.post('/merchants', (req: Request, res: Response) => merchantController.create(req, res));
merchantRouter.put('/merchant/:id', (req: Request, res: Response) => merchantController.update(req, res));
merchantRouter.delete('/merchant/:id', (req: Request, res: Response) => merchantController.delete(req, res));

export default merchantRouter;
