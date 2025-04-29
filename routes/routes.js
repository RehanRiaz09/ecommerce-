import express from 'express';
const routes = express.Router();
import userRouter from './userRouter.js';

routes.use('/auth', userRouter);

export default routes;
