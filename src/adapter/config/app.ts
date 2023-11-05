import express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import pinoHTTP, { HttpLogger } from "pino-http";
import helmet from 'helmet';
const timeout = require('connect-timeout')

import routes from "../routes";
import { logger } from '../utils/logger';
import { PINO_HTTP_LOG_LEVEL } from './config';
import { addDependencyInjectionConfig } from './dependencyInjection';
import path from 'path';

export class App {
  
  private server: express.Application;
  private public = path.join(__dirname, 'public');
  
  constructor() {
    this.addDependencies();
    this.server = express();
    this.defineStaticFolder();
    this.useMiddleware();
    this.defineTimeout();
    this.addParser();
    this.addLogger(pinoHTTP({logger, useLevel: (PINO_HTTP_LOG_LEVEL as any) }));
    this.addRoutes(routes);
    this.addSecurityHeaders();
    this.stopOnTimeout();
  }

  public getServerReference(): express.Application {
    return this.server;
  }

  public addLogger(pino: HttpLogger<IncomingMessage, ServerResponse<IncomingMessage>>): void {
    this.server.use(pino);
  }

  private stopOnTimeout(): void {
    this.server.use((req: any, res, next) => {
      if (!req.timedout) {
        next()
      }
    });
  }

  private defineTimeout(): void {
    this.server.use(timeout('1s'));
  }

  private defineStaticFolder(): void {
    this.server.use('/static', express.static("./public"));
  }

  private addParser(): void {
    this.server.use(express.json())
  }

  private addSecurityHeaders(): void {
    this.server.disable("x-powered-by");
    this.server.use(helmet());
  }

  private addDependencies(): void {
    addDependencyInjectionConfig();
  }
  
  private useMiddleware(): void {
    this.server.use(express.json())
  }

  private addRoutes(routeList: any): void {
    this.server.use(routeList);

    this.server.all("*", (req, res) => {
      res.sendFile(path.join(`${this.public}`, '../../../../public/index.html'));
    });
  }
}
