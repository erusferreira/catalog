import { Router } from 'express';
import { ignoreFavicon } from '../utils/ignoreFavicon'
import catalogRouter from './catalog';
import categoryRouter from './category';
import healthRouter from './health';
import merchantRouter from './merchant';
import itemRouter from './item';
import authRouter from './auth';
import userRouter from './user';


const routes = Router();
routes.use(ignoreFavicon);
routes.use(authRouter);
routes.use(healthRouter);
routes.use(catalogRouter);
routes.use(merchantRouter);
routes.use(categoryRouter);
routes.use(itemRouter);
routes.use(userRouter);

export default routes;
