import Product from '../model/product.js';
import Inventory from '../model/inventory.js';
import mongoose from 'mongoose';
import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';

const validateNewOrder = async (req, res, next) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0)
      return Response.badRequest(res, 'Invalid products array');

    const productIds = products.map((p) => p.productId);
    if (productIds.some((id) => !mongoose.Types.ObjectId.isValid(id)))
      return Response.badRequest(res, 'Invalid product ID(s)');

    const productDocs = await Product.find({ _id: { $in: productIds } });
    if (productDocs.length !== products.length)
      return Response.notfound(res, messageUtil.NOT_FOUND);

    let total = 0;
    req.body.products = products.map((item) => {
      const product = productDocs.find(
        (p) => p._id.toString() === item.productId
      );
      const quantity = item.quantity || 1;
      const price = product.price;
      total += price * quantity;
      return {
        productId: product._id,
        quantity,
        price,
        itemTotal: price * quantity,
      };
    });

    req.body.total = total;
    next();
  } catch (error) {
    Response.serverError(res, error);
  }
};
const validateOrder = async (req, res, next) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return Response.badRequest(res, 'Invalid products array');
    }

    const productIds = products.map((p) => p.productId);
    if (productIds.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
      return Response.badRequest(res, 'Invalid product ID(s)');
    }

    // Fetch inventory data for all productIds
    const inventoryDocs = await Inventory.find({
      productId: { $in: productIds },
    });

    if (inventoryDocs.length !== products.length) {
      return Response.notfound(res, messageUtil.NOT_FOUND);
    }

    let total = 0;

    req.body.products = products.map((item) => {
      const inventory = inventoryDocs.find(
        (inv) => inv.productId.toString() === item.productId
      );

      if (!inventory) {
        throw new Error(`Inventory not found for product ${item.productId}`);
      }

      const quantity = item.quantity || 1;
      const price = inventory.price;

      total += price * quantity;

      return {
        productId: inventory.productId,
        sellerId: inventory.user, // attach sellerId from inventory
        quantity,
        price,
        itemTotal: price * quantity,
      };
    });

    req.body.total = total;

    next();
  } catch (error) {
    Response.serverError(res, error.message || error);
  }
};

export default validateOrder;
