import express from 'express';
const routes = express.Router();
import auth from '../middleware/auth.js';
import Inventory from '../controller/inventoryController.js';

routes.post('/', auth.authenticateToken, Inventory.inventoryCreate);
routes.get('/', auth.authenticateUser, Inventory.findAllInventory);
routes.get('/:inventoryId', Inventory.findInventory);
routes.patch('/update/:inventoryId', Inventory.inventoryUpdate);
routes.delete('/:inventoryId', Inventory.inventoryDelete);

export default routes;
