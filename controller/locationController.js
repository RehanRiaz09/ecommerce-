import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';
import locationService from '../services/locationService.js';
class locationCrud {
  locationCreate = async (req, res) => {
    try {
      const location = await locationService.createLocation({
        user: req.userId,
        ...req.body,
      });
      Response.success(res, messageUtil.SUCCESS, location);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  getAllLocation = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return Response.unauthorized(res, 'User not authenticated');
      }
      const docs = await locationService.findAll(req.query);
      if (docs.length === 0) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      return Response.success(res, messageUtil.OK, docs);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  getLocation = async (req, res) => {
    try {
      const locationId = req.params.locationId;
      const response = await locationService.findLocation({ _id: locationId });
      if (response.length === 0) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      return Response.success(res, messageUtil.OK, response);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  locationUpdate = async (req, res) => {
    try {
      const locationId = req.params.locationId;
      const response = await cartService.findCart({ _id: locationId });
      if (!response) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      const location = await locationService.updateLocation(
        { _id: locationId },
        req.body
      );
      Response.success(res, messageUtil.UPDATE, location);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
  locationDelete = async (req, res) => {
    try {
      const locationId = req.params.locationId;
      const response = await cartService.findCart({ _id: locationId });
      if (!response) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      await locationService.delateLocation(locationId);
      Response.success(res, messageUtil.DELETE);
    } catch (error) {}
  };
}

export default new locationCrud();
