import { Schema, model } from 'mongoose';
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String },
    images: { type: String },
  },
  { timestamps: true }
);
export default model('Product', productSchema);
