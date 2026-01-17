
import { Request, Response } from 'express';
import Job from '../models/Job';

// Fix: Use 'any' type for req and res to allow access to json, params, body, and status properties
export const getJobs = async (req: any, res: any) => {
  const jobs = await Job.find({}).sort({ createdAt: -1 });
  res.json(jobs);
};

export const getJobById = async (req: any, res: any) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
};

export const createJob = async (req: any, res: any) => {
  const { title, department, qualification, ageLimit, startDate, lastDate, applyLink } = req.body;

  const job = new Job({
    title,
    department,
    qualification,
    ageLimit,
    startDate,
    lastDate,
    applyLink,
  });

  const createdJob = await job.save();
  res.status(201).json(createdJob);
};
