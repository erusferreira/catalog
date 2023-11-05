import { Router, Request, Response } from "express";
import { container } from "tsyringe";
import { HealthCheckController } from "../../controller/health";

const healthRouter = Router();
const healthCheckController = container.resolve(HealthCheckController);
healthRouter.get("/health", (req: Request, res: Response) => healthCheckController.get(req, res));

export default healthRouter;
