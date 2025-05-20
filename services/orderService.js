import Order from '../model/order.js';
import Product from '../model/product.js';
import Inventory from '../model/inventory.js';
import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';

class orderCrud {
  createOrder = async (orderData) => {
    const { user, products, locationId } = orderData;

    // 1. Fetch all inventory records for the requested products
    const productIds = products.map((p) => p.productId);
    const inventoryItems = await Inventory.find({
      productId: { $in: productIds },
    }).populate('productId');

    if (inventoryItems.length === 0) {
      throw new Error('No inventory found for the given products');
    }

    // 2. Group products by seller
    const grouped = {};

    for (const order of products) {
      const inventory = inventoryItems.find(
        (inv) => inv.productId._id.toString() === order.productId
      );

      if (!inventory) continue;

      const sellerId = inventory.user.toString();
      const quantity = order.quantity || 1;
      const price = inventory.price;

      if (!grouped[sellerId]) grouped[sellerId] = [];

      grouped[sellerId].push({
        productId: inventory.productId._id,
        sellerId,
        quantity,
        price,
        itemTotal: price * quantity,
      });
    }

    // 3. Create separate orders
    const orderList = await Promise.all(
      Object.entries(grouped).map(async ([sellerId, sellerProducts]) => {
        const total = sellerProducts.reduce((sum, p) => sum + p.itemTotal, 0);

        return await Order.create({
          user,
          products: sellerProducts,
          locationId,
          total,
          status,
          paymentStatus,
        });
      })
    );

    return orderList;
  };

  findAll = async (query) => {
    return await Order.find(query);
  };
  findOrder = async (OrderId) => {
    return await Order.findOne(OrderId).populate(
      'products.productId user',
      'title price name email'
    );
  };
  updateOrder = async (query, data) => {
    return await Order.findByIdAndUpdate(query, data);
  };
  deleteOrder = async (query) => {
    return await Order.findByIdAndDelete(query);
  };
  findOrdersBySeller = async (sellerId) => {
    const sellerIdStr = sellerId;

    const orders = await Order.find({ 'products.sellerId': sellerId })
      .populate({
        path: 'products.productId',
        select: 'title price',
      })
      .populate({
        path: 'user',
        select: 'name email',
      });

    return orders.map((order) => {
      const filteredProducts = (order.products || []).filter(
        (item) => item.sellerId?.toString() === sellerIdStr
      );

      return {
        _id: order._id,
        user: order.user,
        products: filteredProducts,
        locationId: order.locationId,
        status: order.status,
        paymentStatus: order.paymentStatus,
      };
    });
  };
}
export default new orderCrud();
