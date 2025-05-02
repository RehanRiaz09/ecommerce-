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
    adress: [
      {
        shippingAddress: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        zip: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
      },
    ],
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
