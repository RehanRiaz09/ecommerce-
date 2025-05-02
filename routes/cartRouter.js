import express from 'express';
const routes = express.Router();
import validateOrder from '../middleware/orderMiddleware.js';
import auth from '../middleware/auth.js';
import cartController from '../controller/cartController.js';

routes.post('/', validateOrder, cartController.cartCreate);
routes.get('/', auth.authenticateUser, cartController.findAllCart);
routes.get('/:cartId', cartController.findCart);
routes.patch('/update/:cartId', validateOrder, cartController.cartUpdate);
routes.delete('/:cartId', cartController.cartDelete);

export default routes;
