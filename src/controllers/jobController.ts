import { Request, Response } from 'express';
import Job from '../models/Job';

export const createJob = async (req: Request, res: Response) => {
  const job = await Job.create({ ...req.body, user: req.user?.id });
  res.status(201).json(job);
};

export const getJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find().populate('user', 'name email');
  res.json(jobs);
};

export const getJobById = async (req: Request, res: Response): Promise<any> => {
  const job = await Job.findById(req.params.id); 
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.status(200).json(job);
};

export const updateJob = async (req: Request, res: Response) :Promise<any> => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.user.toString() !== req.user?.id && req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  return res.json(updated);
};

export const deleteJob = async (req: Request, res: Response) :Promise<any> => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.user.toString() !== req.user?.id && req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  await job.deleteOne();
  return res.json({ message: 'Job deleted' });
};
