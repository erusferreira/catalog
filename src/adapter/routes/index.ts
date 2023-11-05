import { Router } from 'express';
import catalogRouter from './catalog';
import categoryRouter from './category';
import healthRouter from './health';
import merchantRouter from './merchant';

const routes = Router();
routes.use(healthRouter);
routes.use(catalogRouter);
routes.use(merchantRouter);
routes.use(categoryRouter);

export default routes;
