// import { Schema, model } from 'mongoose';
import mongoose, { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    },
  },
  { timeStamps: true }
);
export default model('Order', orderSchema);
