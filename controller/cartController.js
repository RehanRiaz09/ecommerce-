import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';
import cartService from '../services/cartService.js';

class cartController {
  cartCreate = async (req, res) => {
    try {
      const cart = await cartService.createCart(req.body);
      return Response.success(res, messageUtil.SUCCESS, cart);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  findAllCart = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return Response.unauthorized(res, 'User not authenticated');
      }
      const response = await cartService.findAll(req.query);
      if (response.length === 0) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      return Response.success(res, messageUtil.OK, response);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  findCart = async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const doc = await cartService.findCart({ _id: cartId });
      Response.success(res, messageUtil.OK, doc);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  cartUpdate = async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const response = await cartService.findCart({ _id: cartId });
      if (!response) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      const cart = await cartService.updateCart({ _id: cartId }, req.body);
      return Response.success(res, messageUtil.UPDATE, cart);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  cartDelete = async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const response = await cartService.findCart({ _id: cartId });
      if (!response) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      await cartService.deleteCart(cartId);
      Response.success(res, messageUtil.DELETE);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
}
export default new cartController();
