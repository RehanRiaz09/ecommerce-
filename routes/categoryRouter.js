import express from 'express';
const routes = express.Router();
import categoryController from '../controller/categoryController.js';
import auth from '../middleware/auth.js';

routes.post('/', categoryController.categoryCreate);

export default routes;
