import mongoose, { Schema, model } from 'mongoose';

const locationSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shippingAddress1: { type: String, required: true },
    shippingAddress2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String, required: true },
    latitude: { type: String },
    longitude: { type: String },
  },
  { timestamps: true }
);
export default model('Location', locationSchema);
