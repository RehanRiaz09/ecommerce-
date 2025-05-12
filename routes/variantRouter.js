import express from 'express';
const routes = express.Router();
import auth from '../middleware/auth.js';
import Variant from '../controller/variantController.js';

routes.post('/', auth.authenticateToken, Variant.variantCreate);
routes.get('/', auth.authenticateUser, Variant.getAll);
routes.get('/:variantId', Variant.getVariant);
routes.patch('/:variantId', Variant.variantUpdate);
routes.delete('/:variantId', Variant.variantDelete);
export default routes;
