import { Router } from 'express';
// const favicon = require('serve-favicon');
// const path = require('path');

import catalogRouter from './catalog';
import categoryRouter from './category';
import healthRouter from './health';
import merchantRouter from './merchant';
import itemRouter from './item';
import authRouter from './auth';
import userRouter from './user';

const routes = Router();
// routes.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
routes.use(authRouter);
routes.use(healthRouter);
routes.use(catalogRouter);
routes.use(merchantRouter);
routes.use(categoryRouter);
routes.use(itemRouter);
routes.use(userRouter);

export default routes;
