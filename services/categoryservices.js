import Category from '../model/category.js';

class categoryCrud {
  createCategory = async (query) => {
    return await Category.create(query);
  };
  findAll = async (query) => {
    return await Category.find(query);
  };
  findCategory = async (categoryId) => {
    return await Category.findOne(categoryId);
  };
  updateCategory = async (query, data) => {
    return await category.findByIdAndUpdate(query, data);
  };
  deleteCategory = async (query) => {
    return await Category.findOneAndDelete(query);
  };
}

export default new categoryCrud();
