import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import { MerchantController } from "@adapter/controller/merchant";

const merchantRouter = Router();
const merchantController = container.resolve(MerchantController);
merchantRouter.get('/merchants', (req: Request, res: Response) => merchantController.listAll(req, res));
merchantRouter.post('/merchants', (req: Request, res: Response) => merchantController.create(req, res));

export default merchantRouter;
