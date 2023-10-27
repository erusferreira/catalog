import express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import pinoHTTP, { HttpLogger } from "pino-http";

import routes from "../routes";
import { logger } from '../utils/logger';
import { PINO_HTTP_LOG_LEVEL } from './config';

export class App {
  
  private server: express.Application;
  
  constructor() {
    this.server = express();
    this.useMiddleware();
    this.addLogger(pinoHTTP({logger, useLevel: (PINO_HTTP_LOG_LEVEL as any) }));
    this.addRoutes(routes);
  }

  public getServerReference(): express.Application {
    return this.server;
  }

  public addLogger(pino: HttpLogger<IncomingMessage, ServerResponse<IncomingMessage>>): void {
    this.server.use(pino);
  }
  
  private useMiddleware() {
    this.server.use(express.json())
  }

  private addRoutes(routeList: any) {
    this.server.use(routeList);
  }
}
