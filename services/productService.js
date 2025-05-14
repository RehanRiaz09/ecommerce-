import Product from '../model/product.js';
class productCrud {
  createProduct = async (query) => {
    return await Product.create(query);
  };
  findAll = async (query) => {
    return await Product.find(query);
  };
  findProduct = async (productId) => {
    return await Product.findOne(productId);
  };
  updateProduct = async (query, data) => {
    return await Product.findByIdAndUpdate(query, data);
  };
  delateProduct = async (query) => {
    return await Product.findByIdAndDelete(query);
  };
  createNew = async (query, session) => {
    return await Product.create([query], { session });
  };
}
export default new productCrud();
