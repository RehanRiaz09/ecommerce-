import mongoose, { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    slug: { type: String, unique: true },
  },
  { timeStamps: true }
);

export default model('Category', categorySchema);
