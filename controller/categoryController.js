import Response from '../utilities/response.js';
import messageUtil from '../utilities/message.js';
import categoryservices from '../services/categoryservices.js';

class categoryController {
  categoryCreate = async (req, res) => {
    try {
      const parentId = req.params.parentId;
      const category = await categoryservices.createCategory(req.body);
      if (parentId && category) {
        const parent = await categoryservices.findCategory({ _id: parentId });

        if (!parent) {
          return Response.notfound(res, messageUtil.NOT_FOUND);
        }

        parent.children.push(category._id);
        await parent.save(); // Important: persist the update
      }
      Response.success(res, messageUtil.SUCCESS, category);
    } catch (error) {
      Response.serverError(res, error);
    }
  };
}

export default new categoryController();
