import mongoose, { Schema, model } from 'mongoose';
const cartSchema = new Schema(
  {
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);
export default model('Cart', cartSchema);
