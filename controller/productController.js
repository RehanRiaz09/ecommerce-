import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';
import productservices from '../services/productService.js';
import Product from '../model/product.js';
import Inventory from '../model/inventory.js';
import Variant from '../model/variant.js';
import Warehouse from '../model/warehouse.js';
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
        user: req.userId,
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
  createProductWithInventory = async (req, res) => {
    const session = await Product.startSession();
    session.startTransaction();

    try {
      const { user, variant, warehouse } = req.body;

      // 1. Create or find warehouse
      let warehouseDoc = await Warehouse.findOne({
        name: warehouse.name,
        user,
      });

      if (!warehouseDoc) {
        warehouseDoc = new Warehouse({ ...warehouse, user });
        await warehouseDoc.save({ session });
      }

      // // 2. Upload product image
      const result = await cloudinary.uploader.upload(req.file.path);

      // 3. Create product
      const product = await productservices.createProduct(
        {
          user: req.userId,
          ...req.body,
          images: result.secure_url,
        },
        session
      ); // Pass session if supported

      // 4. Create variant with product ID
      const newVariant = new Variant({
        user,
        size: variant.size,
        color: variant.color,
        warehouse: warehouseDoc._id,
        productId: product._id, // <-- Add product reference here
      });
      await newVariant.save({ session });

      // 5. Create inventory with product and variant ID
      const newInventory = new Inventory({
        user,
        variant: newVariant._id,
        price: variant.price,
        stock: variant.stock,
        warehouse: warehouseDoc._id,
        productId: product._id, // <-- Add product reference here
      });
      await newInventory.save({ session });

      await session.commitTransaction();
      session.endSession();
      Response.success(
        res,
        messageUtil.SUCCESS,
        product,
        newVariant,
        newInventory,
        warehouseDoc
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      Response.serverError(res, error);
    }
  };
}
export default new productController();
