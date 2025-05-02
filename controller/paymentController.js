import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';
import paymentService from '../services/paymentService.js';
import orderService from '../services/orderService.js';

class paymentController {
  paymentCreate = async (req, res) => {
    try {
      const payment = await paymentService.createPayment(req.body);
      if (req.body.status === 'paid') {
        await orderService.updateOrder(
          { _id: req.body.order },
          { paymentStatus: 'paid' }
        );
      }
      console.log();

      return Response.success(res, messageUtil.SUCCESS, payment);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  findAllPayments = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return Response.unauthorized(res, 'User not authenticated');
      }
      const response = await paymentService.findAll(req.query);
      if (response.length === 0) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      return Response.success(res, messageUtil.OK, response);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  findPayment = async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      const doc = await paymentService.findPayment({ _id: paymentId });
      Response.success(res, messageUtil.OK, doc);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  paymentUpdate = async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      const response = await paymentService.findPayment({ _id: paymentId });
      if (!response) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      const payment = await paymentService.updatePayment(
        { _id: paymentId },
        req.body
      );
      return Response.success(res, messageUtil.UPDATE, payment);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  paymentDelete = async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      const response = await paymentService.findPayment({ _id: paymentId });
      if (!response) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      await paymentService.deletePayment(paymentId);
      Response.success(res, messageUtil.DELETE);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
}

export default new paymentController();
