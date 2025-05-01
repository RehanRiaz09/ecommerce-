import express from 'express';
const routes = express.Router();
import orderController from '../controller/orderController.js';
import validateOrder from '../middleware/orderMiddleware.js';
import auth from '../middleware/auth.js';

routes.post('/', validateOrder, orderController.orderCreate);
routes.get('/', auth.authenticateUser, orderController.findAllOrders);
routes.get('/:orderId', orderController.findOrder);
routes.patch('/update/:orderId', orderController.orderUpdate);
routes.delete('/:orderId', orderController.orderDelete);

export default routes;
