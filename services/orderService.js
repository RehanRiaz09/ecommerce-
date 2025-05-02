import Order from '../model/order.js';
class orderCrud {
  createOrder = async (query) => {
    return await Order.create(query);
  };
  findAll = async (query) => {
    return await Order.find(query).populate(
      'products.productId user',
      'title price name email'
    );
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
}
export default new orderCrud();
