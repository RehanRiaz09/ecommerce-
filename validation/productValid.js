import Joi from 'joi';
import messageUtil from '../utilities/message.js';
import Response from '../utilities/response.js';

class productValidation {
  product = (req, res, next) => {
    try {
      const schema = Joi.object({
        user: Joi.string().required().message({
          'string.base': messageUtil.USER_STRING_BASE,
          'string.empty': messageUtil.USER_STRING_EMPTY,
          'any.required': messageUtil.USER_REQUIRED,
        }),
        title: Joi.string().required().message({
          'string.base': messageUtil.PRODUCT_TITLE_STRING_BASE,
          'string.empty': messageUtil.PRODUCT_TITLE_STRING_EMPTY,
          'any.required': messageUtil.PRODUCT_TITLE_REQUIRED,
        }),
      });
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return Response.badRequest(
          res,
          error.details.map((detail) => detail.message)
        );
      }
      next();
    } catch (error) {
      Response.serverError(res, error);
    }
  };
}
export default new productValidation();
