import express from 'express';
const routes = express.Router();
import userRouter from './userRouter.js';
import productRouter from './productrouter.js';

routes.use('/auth', userRouter);
routes.use('/product', productRouter);
export default routes;
