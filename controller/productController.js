import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';
import productservices from '../services/productService.js';
import cloudinary from 'cloudinary';
const dotenv = await import('dotenv');
dotenv.config();

class productController {
  ProductCreate = async (req, res) => {
    try {
      //   if (!req.file) {
      //     return Response.badRequest(res, 'Image file is required');
      //   }
      const result = await cloudinary.uploader.upload(req.file.path);
      const product = await productservices.createProduct({
        ...req.body,
        images: result.secure_url,
      });

      Response.success(res, messageUtil.OK, product);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  findAll = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return Response.unauthorized(res, 'User not authenticated');
      }
      const response = await productservices.findAll(req.query);

      if (response.length === 0) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      return Response.success(res, response, messageUtil.OK);
    } catch (error) {
      Response.serverError(res, error);
    }
  };

  findProduct = async (req, res) => {
    try {
      const docs = await productservices.findProduct(req.params.id);
      Response.success(res, messageUtil.OK, docs);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  updateProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      const response = await productservices.updateProduct(
        { _id: productId },
        req.body
      );

      Response.success(res, messageUtil.UPDATE, response);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  deleteProduct = async (req, res) => {
    try {
      await productservices.delateProduct(req.params.productId);
      Response.success(res, messageUtil.DELETE);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
}
export default new productController();
