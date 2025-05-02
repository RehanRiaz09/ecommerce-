import mongoose, { Schema, model } from 'mongoose';
const paymentSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    amount: { type: Number, required: true },
    method: { type: String, required: true }, // e.g., 'Credit Card', 'PayPal', 'Stripe'
    status: { type: String, default: 'Processing' }, // Paid, Failed, Refunded
    transactionId: { type: String },
  },
  { timestamps: true }
);

export default model('Payment', paymentSchema);
