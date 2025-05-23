import Cart from '../model/cart.js';
class cartCrud {
  createCart = async (query) => {
    return await Cart.create(query);
  };
  findAll = async (query) => {
    return await Cart.find(query).populate(
      'products.productId user',
      'title price name email'
    );
  };
  findCart = async (cartId) => {
    return await Cart.findOne(cartId).populate(
      'products.productId user',
      'title price name email'
    );
  };
  updateCart = async (query, data) => {
    return await Cart.findByIdAndUpdate(query, data);
  };
  deleteCart = async (query) => {
    return await Cart.findByIdAndDelete(query);
  };
}
export default new cartCrud();
