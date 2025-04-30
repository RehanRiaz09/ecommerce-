import express from 'express';
const routes = express.Router();
import productController from '../controller/productController.js';
import multer from 'multer';
import auth from '../middleware/auth.js';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limit: { fileSize: 5 * 1024 * 1024 },
});

routes.post('/', upload.single('images'), productController.ProductCreate);
routes.get('/', auth.authenticateUser, productController.findAll);
routes.get('/:productId', productController.findProduct);
routes.put(
  '/update/:productId',
  upload.single('images'),
  productController.updateProduct
);
routes.delete('/:productId', productController.deleteProduct);

export default routes;
