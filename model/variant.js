import mongoose, { Schema, model } from 'mongoose';

const variantSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  size: { type: String },
  color: { type: String },
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true,
  },
});
export default model('Variant', variantSchema);
