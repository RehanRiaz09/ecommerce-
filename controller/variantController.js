import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';
import variantService from '../services/variantService.js';
class variantController {
  variantCreate = async (req, res) => {
    try {
      const variant = await variantService.createVariant({
        user: req.userId,
        ...req.body,
      });
      Response.success(res, messageUtil.SUCCESS, variant);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  getAll = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return Response.unauthorized(res, 'User not authenticated');
      }
      const docs = await variantService.findAll(req.query);
      if (docs.length === 0) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      Response.success(res, messageUtil.OK, docs);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  getVariant = async (req, res) => {
    try {
      const variantId = req.params.variantId;
      const response = await variantService.findVariant({ _id: variantId });
      if (!response) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      Response.success(res, messageUtil.OK, response);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  variantUpdate = async (req, res) => {
    try {
      const variantId = req.params.variantId;
      const variant = await variantService.updateVariant(
        { _id: variantId },
        req.body
      );
      Response.success(res, messageUtil.UPDATE, variant);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  variantDelete = async (req, res) => {
    try {
      const variantId = req.params.variantId;
      const doc = await variantService.deleteVariant({ _id: variantId });
      if (!doc) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      return Response.success(res, messageUtil.DELETE);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
}

export default new variantController();
