import express from 'express';
const routes = express.Router();
import userRouter from './userRouter.js';
import productRouter from './productrouter.js';
import orderRouter from './orderRouter.js';
import cartRouter from './cartRouter.js';
import paymentRouter from './paymentRouter.js';
import locationRouter from './locationRouter.js';

routes.use('/auth', userRouter);
routes.use('/product', productRouter);
routes.use('/order', orderRouter);
routes.use('/cart', cartRouter);
routes.use('/payment', paymentRouter);
routes.use('/location', locationRouter);

export default routes;
