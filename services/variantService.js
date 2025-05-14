import Variant from '../model/variant.js';

class variantCrud {
  createVariant = async (query) => {
    return await Variant.create(query);
  };
  findAll = async (query) => {
    return await Variant.find(query).populate(
      'user productId warehouse',
      'name email title price name address'
    );
  };
  findVariant = async (variantId) => {
    return await Variant.findOne(variantId).populate(
      'user productId warehouse',
      'name email title price name address'
    );
  };
  updateVariant = async (query, data) => {
    return await Variant.findByIdAndUpdate(query, data);
  };
  deleteVariant = async (query) => {
    return await Variant.findByIdAndDelete(query);
  };
}

export default new variantCrud();
