import 'reflect-metadata';

import { LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@/config';
import { Routes } from '@/interfaces/routes.interface';
import { ErrorMiddleware } from '@/middlewares/error.middleware';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { logger, stream } from './utils/logger';

export class App {
  public app: express.Application = express();
  public env: string = NODE_ENV;
  public port: string | number = PORT;

  constructor(routes: Routes[]) {
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
