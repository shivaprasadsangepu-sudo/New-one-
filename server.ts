
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import jobRoutes from './routes/jobRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorMiddleware';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json() as any); // Fix: Cast to any to resolve overload resolution mismatch errors

app.use('/api/jobs', jobRoutes);
app.use('/api/admin', authRoutes);

app.get('/', (req, res) => {
  res.send('GovPortal API is running...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
