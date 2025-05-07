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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    },
    paymentStatus: { type: String, default: 'Unpaid' },
  },
  { timeStamps: true }
);
export default model('Order', orderSchema);
