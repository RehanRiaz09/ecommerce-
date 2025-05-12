import express from 'express';
const routes = express.Router();
import auth from '../middleware/auth.js';
import Warehouse from '../controller/warehouseController.js';

routes.post('/', auth.authenticateToken, Warehouse.warehouseCreate);
routes.get('/', auth.authenticateUser, Warehouse.getAll);
routes.get('/:warehouseId', Warehouse.warehouseFind);
routes.patch('/:warehouseId', Warehouse.warehouseUpdate);
routes.delete('/:warehouseId', Warehouse.warehouseDelete);

export default routes;
