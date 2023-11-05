import { Request, Response } from "express";
import { injectable } from "tsyringe";

@injectable()
export class HealthCheckController {
  async get(req: Request, res: Response) {
    const healthCheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };
    res.status(200).json(healthCheck);
  }
}
