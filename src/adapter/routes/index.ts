import { Router } from 'express';
import catalogRouter from './catalog';
import categoryRouter from './category';
import healthRouter from './health';
import merchantRouter from './merchant';
import itemRouter from './item';
import authRouter from './auth';
import userRouter from './user';

const routes = Router();
routes.use(healthRouter);
routes.use(catalogRouter);
routes.use(merchantRouter);
routes.use(categoryRouter);
routes.use(itemRouter);
routes.use(authRouter);
routes.use(userRouter);

export default routes;
