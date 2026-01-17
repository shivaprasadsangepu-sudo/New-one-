
import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  department: string;
  qualification: string;
  ageLimit: string;
  startDate: Date; // Added
  lastDate: Date;
  applyLink: string;
  createdAt: Date;
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  qualification: { type: String, required: true },
  ageLimit: { type: String, required: true },
  startDate: { type: Date, required: true }, // Added
  lastDate: { type: Date, required: true },
  applyLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IJob>('Job', JobSchema);
