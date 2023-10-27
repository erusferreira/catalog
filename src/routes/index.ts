import { Router } from 'express';
import healthRouter from './health';

const routes = Router();
routes.use(healthRouter);

export default routes;
