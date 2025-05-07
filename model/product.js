import mongoose, { Schema, model } from 'mongoose';
const productSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String },
    weight: { type: String },
    brand: { type: String },
    size: { type: String },
    images: { type: String },
  },
  { timestamps: true }
);
export default model('Product', productSchema);
