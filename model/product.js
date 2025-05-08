import mongoose, { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    brand: { type: String },
    images: { type: String },
  },
  { timestamps: true }
);
export default model('Product', productSchema);
