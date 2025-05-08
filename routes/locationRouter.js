import express from 'express';
const routes = express.Router();
import locationController from '../controller/locationController.js';
import auth from '../middleware/auth.js';

routes.post('/', auth.authenticateToken, locationController.locationCreate);
routes.get('/', auth.authenticateUser, locationController.getAllLocation);
routes.get('/:locationId', locationController.getLocation);
routes.patch('/:locationId', locationController.locationUpdate);
routes.delete('/:locationId', locationController.locationDelete);

export default routes;
