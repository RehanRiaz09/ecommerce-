import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';
import inventoryService from '../services/inventoryService.js';

class inventoryController {
  inventoryCreate = async (req, res) => {
    try {
      const inventory = await inventoryService.createInventory({
        user: req.userId,
        ...req.body,
      });
      return Response.success(res, messageUtil.SUCCESS, inventory);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  findAllInventory = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return Response.unauthorized(res, 'User not authenticated');
      }
      const response = await inventoryService.findAll(req.query);
      if (response.length === 0) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      return Response.success(res, messageUtil.OK, response);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  findInventory = async (req, res) => {
    try {
      const inventoryId = req.params.inventoryId;
      const doc = await inventoryService.findInventory({ _id: inventoryId });
      Response.success(res, messageUtil.OK, doc);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  inventoryUpdate = async (req, res) => {
    try {
      const inventoryId = req.params.inventoryId;
      const response = await inventoryService.findInventory({
        _id: inventoryId,
      });
      if (!response) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      const inventory = await inventoryService.updateInventory(
        { _id: inventoryId },
        req.body
      );
      return Response.success(res, messageUtil.UPDATE, inventory);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  inventoryDelete = async (req, res) => {
    try {
      const inventoryId = req.params.inventoryId;
      const doc = await inventoryService.deleteInventory({ _id: inventoryId });
      if (!doc) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      return Response.success(res, messageUtil.DELETE);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
}
export default new inventoryController();
