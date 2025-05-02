import express from 'express';
const routes = express.Router();
import auth from '../middleware/auth.js';
import paymentController from '../controller/paymentController.js';
routes.post('/', paymentController.paymentCreate);
routes.get('/', auth.authenticateUser, paymentController.findAllPayments);
routes.get('/:paymentId', paymentController.findPayment);
routes.patch('/update/:paymentId', paymentController.paymentUpdate);
routes.delete('/:paymentId', paymentController.paymentDelete);

export default routes;
