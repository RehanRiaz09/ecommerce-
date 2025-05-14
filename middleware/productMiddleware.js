import Product from '../model/product.js';
import Inventory from '../model/inventory.js';
import Warehouse from '../model/warehouse.js';
import Variant from '../model/variant.js';

const createProductRelations = async (req, res, next) => {
  const session = await Product.startSession();
  session.startTransaction();

  try {
    const user = req.body.user;
    const warehouse = JSON.parse(req.body.warehouse);
    const variant = JSON.parse(req.body.variant);

    // 1. Find or create warehouse
    let warehouseDoc = await Warehouse.findOne({ name: warehouse.name, user });
    if (!warehouseDoc) {
      warehouseDoc = new Warehouse({ ...warehouse, user });
      await warehouseDoc.save({ session });
    }

    req.body.warehouseDoc = warehouseDoc;

    // 2. Create single variant
    const newVariant = new Variant({
      user,
      size: variant.size,
      color: variant.color,
      warehouse: warehouseDoc._id,
    });
    await newVariant.save({ session });

    // 3. Create single inventory
    const newInventory = new Inventory({
      user,
      variant: newVariant._id,
      price: variant.price,
      stock: variant.stock,
      warehouse: warehouseDoc._id,
    });
    await newInventory.save({ session });

    // 4. Attach created objects and session to req
    req.createdVariants = newVariant;
    req.createdInventory = newInventory;
    req.mongoSession = session;

    next();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};
export default createProductRelations;
