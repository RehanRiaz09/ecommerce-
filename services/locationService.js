import Location from '../model/location';

class locationCrud {
  createLocation = async (query) => {
    return await Location.create(query);
  };
  findAll = async (query) => {
    return await Location.find(query);
  };
  findLocation = async (locationId) => {
    return await Location.findOne(locationId);
  };
  updateLocation = async (query, data) => {
    return await Location.findByIdAndUpdate(query, data);
  };
  delateLocation = async (query) => {
    return await Location.findByIdAndDelete(query);
  };
}

export default new locationCrud();
