import express from 'express';
const routes = express.Router();
import userRouter from './userRouter.js';
import productRouter from './productrouter.js';
import orderRouter from './orderRouter.js';

routes.use('/auth', userRouter);
routes.use('/product', productRouter);
routes.use('/order', orderRouter);
export default routes;
