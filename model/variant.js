import mongoose, { Schema, model } from 'mongoose';

const variantSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  size: { type: String },
  color: { type: String },
});
export default model('Variant', variantSchema);
