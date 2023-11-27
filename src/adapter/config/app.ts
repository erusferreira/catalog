import express from "express";
import { IncomingMessage, ServerResponse } from "http";
import pinoHTTP, { HttpLogger } from "pino-http";
import helmet from "helmet";
const timeout = require("connect-timeout");
import cors from "cors";
import path from "path";

import routes from "../routes";
import { logger } from "../utils/logger";
import { PINO_HTTP_LOG_LEVEL } from "./config";
import { addDependencyInjectionConfig } from "./dependencyInjection";
import { errorHandler } from "@adapter/utils/error-handling";

export class App {
  private server: express.Application;
  private public = path.join(__dirname, "public");

  constructor() {
    this.addDependencies();
    this.server = express();
    this.defineStaticFolder();
    this.useMiddleware();
    this.defineTimeout();
    this.addParser();
    this.addLogger(pinoHTTP({ logger, useLevel: PINO_HTTP_LOG_LEVEL as any }));
    this.addCors();
    this.addRoutes(routes);
    this.addErrorHandling();
    this.addSecurityHeaders();
    this.stopOnTimeout();
  }

  public getServerReference(): express.Application {
    return this.server;
  }

  public addLogger(
    pino: HttpLogger<IncomingMessage, ServerResponse<IncomingMessage>>
  ): void {
    this.server.use(pino);
  }

  private stopOnTimeout(): void {
    this.server.use((req: any, res, next) => {
      if (!req.timedout) {
        next();
      }
    });
  }

  private addCors(): void {
    const allowedOrigins = process.env.ALLOWED_ORIGINS || "";
    const allowedMethods = process.env.ALLOWED_METHODS || "";
    const allowedHeaders = process.env.ALLOWED_HEADERS || "";
    const exposedHeaders = process.env.EXPOSED_HEADERS || "";
    const maxAge = Number(String(process.env.MAX_AGE));
    const credentials = Boolean(String(process.env.CREDENTIALS)) || false;

    const optionsCors: cors.CorsOptions = {
      origin: allowedOrigins.split(",").map((item) => item.trim()),
      methods: allowedMethods.split(",").map((item) => item.trim()),
      allowedHeaders: allowedHeaders.split(",").map((item) => item.trim()),
      exposedHeaders: exposedHeaders.split(",").map((item) => item.trim()),
      maxAge: maxAge,
      credentials: credentials,
    };

    this.server.use(cors(optionsCors));
  }

  private defineTimeout(): void {
    this.server.use(timeout("1s"));
  }

  private defineStaticFolder(): void {
    this.server.use("/static", express.static("./public"));
  }

  private addParser(): void {
    this.server.use(express.json());
  }

  private addSecurityHeaders(): void {
    this.server.disable("x-powered-by");
    this.server.use(helmet());
  }

  private addDependencies(): void {
    addDependencyInjectionConfig();
  }

  private useMiddleware(): void {
    this.server.use(express.json());
  }

  private addRoutes(routeList: any): void {
    this.server.use(routeList);

    this.server.all("*", (req, res) => {
      res.sendFile(
        path.join(`${this.public}`, "../../../../public/index.html")
      );
    });
  }

  private addErrorHandling() {
    this.server.use(errorHandler);
  }
}
