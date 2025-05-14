import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';
import warehouseService from '../services/warehouseService.js';

class warehouseController {
  warehouseCreate = async (req, res) => {
    try {
      const warehouse = await warehouseService.createWarehouse({
        user: req.userId,
        ...req.body,
      });

      return Response.success(res, messageUtil.SUCCESS, warehouse);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  getAll = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return Response.unauthorized(res, 'User not authenticated');
      }
      const docs = await warehouseService.findAll(req.query);
      if (docs.length === 0) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      Response.success(res, messageUtil.OK, docs);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  warehouseFind = async (req, res) => {
    try {
      const warehouseId = req.params.warehouseId;
      const response = await warehouseService.findWarehouse({
        _id: warehouseId,
      });
      if (!response) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      Response.success(res, messageUtil.OK, response);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  warehouseUpdate = async (req, res) => {
    try {
      const warehouseId = req.params.warehouseId;
      const warehouse = await warehouseService.updateWarehouse(
        { _id: warehouseId },
        req.body
      );
      Response.success(res, messageUtil.UPDATE, warehouse);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  warehouseDelete = async (req, res) => {
    try {
      await warehouseService.deleteWarehouse(req.params.orderId);
      Response.success(res, messageUtil.DELETE);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
}

export default new warehouseController();
