import mongoose, { Schema, model } from 'mongoose';

const inventorySchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  variant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variant',
    required: true,
  },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  stock: { type: Number, default: 0 },
  price: { type: Number, required: true },
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true,
  },
});

export default model('Inventory', inventorySchema);
