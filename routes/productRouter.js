import express from 'express';
const routes = express.Router();
import productController from '../controller/productController.js';
import createProductRelations from '../middleware/productMiddleware.js';
import multer from 'multer';
import auth from '../middleware/auth.js';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename using the current timestamp
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
});

routes.post(
  '/',
  upload.single('images'),
  auth.authenticateToken,
  productController.ProductCreate
);
routes.get('/', auth.authenticateUser, productController.findAll);
routes.get('/:productId', productController.findProduct);
routes.put(
  '/update/:productId',
  upload.single('images'),
  productController.updateProduct
);
routes.delete('/:productId', productController.deleteProduct);

routes.post(
  '/new',
  upload.single('images'),
  auth.authenticateToken,
  createProductRelations,
  productController.newProduct
);
export default routes;
