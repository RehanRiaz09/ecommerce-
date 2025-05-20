import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';
import orderService from '../services/orderService.js';

class orderController {
  orderCreate = async (req, res) => {
    try {
      const order = await orderService.createOrder({
        user: req.userId,
        ...req.body,
      });
      return Response.success(res, messageUtil.SUCCESS, order);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  findAllOrders = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return Response.authorizationError(res, 'User not authenticated');
      }
      const response = await orderService.findAll(req.query);
      if (response.length === 0) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      return Response.success(res, messageUtil.OK, response);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  findOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const doc = await orderService.findOrder({ _id: orderId });
      Response.success(res, messageUtil.OK, doc);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  orderUpdate = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const response = await orderService.updateOrder(
        { _id: orderId },
        req.body
      );
      Response.success(res, messageUtil.UPDATE, response);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  orderDelete = async (req, res) => {
    try {
      await orderService.deleteOrder(req.params.orderId);
      Response.success(res, messageUtil.DELETE);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  getSellerOrders = async (req, res) => {
    try {
      const sellerId = req.user._id; // assuming seller is logged in
      const orders = await orderService.findOrdersBySeller(sellerId);

      return Response.success(res, messageUtil.OK, orders);
    } catch (error) {
      Response.serverError(res, error.message);
    }
  };
}

export default new orderController();
