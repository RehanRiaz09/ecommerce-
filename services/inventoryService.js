import Inventory from '../model/inventory.js';

class inventoryCrud {
  createInventory = async (query) => {
    return await Inventory.create(query);
  };
  findAll = async (query) => {
    return await Inventory.find(query).populate(
      'user productId warehouse variant',
      'name email title price name address'
    );
  };
  findInventory = async (inventoryId) => {
    return await Inventory.findOne(inventoryId).populate(
      'user productId warehouse variant',
      'name email title price name address'
    );
  };
  updateInventory = async (query, data) => {
    return await Inventory.findByIdAndUpdate(query, data);
  };
  deleteInventory = async (query) => {
    return await Inventory.findByIdAndDelete(query);
  };
}

export default new inventoryCrud();
