import mongoose from 'mongoose';
const dotenv = await import('dotenv');
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB is connected`);
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
