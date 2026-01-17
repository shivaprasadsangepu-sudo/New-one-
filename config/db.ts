
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    // Fix: cast to any to ensure exit property is accessible regardless of environment type definitions
    (process as any).exit(1);
  }
};

export default connectDB;
