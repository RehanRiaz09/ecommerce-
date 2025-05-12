import Warehouse from '../model/warehouse.js';

class warehouseCrud {
  createWarehouse = async (query) => {
    return await Warehouse.create(query);
  };
  findAll = async (query) => {
    return await Warehouse.find(query);
  };
  findWarehouse = async (warehouseId) => {
    return await Warehouse.findOne(warehouseId);
  };
  updateWarehouse = async (query, data) => {
    return await Warehouse.findByIdAndUpdate(query, data);
  };
  deleteWarehouse = async (query) => {
    return await Warehouse.findByIdAndDelete(query);
  };
}

export default new warehouseCrud();
