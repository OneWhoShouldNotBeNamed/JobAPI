"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = void 0;
const Job_1 = __importDefault(require("../models/Job"));
const createJob = async (req, res) => {
    const job = await Job_1.default.create({ ...req.body, user: req.user?.id });
    res.status(201).json(job);
};
exports.createJob = createJob;
const getJobs = async (req, res) => {
    const jobs = await Job_1.default.find().populate('user', 'name email');
    res.json(jobs);
};
exports.getJobs = getJobs;
const getJobById = async (req, res) => {
    const job = await Job_1.default.findById(req.params.id);
    if (!job)
        return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
};
exports.getJobById = getJobById;
const updateJob = async (req, res) => {
    const job = await Job_1.default.findById(req.params.id);
    if (!job)
        return res.status(404).json({ message: 'Job not found' });
    if (job.user.toString() !== req.user?.id && req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    const updated = await Job_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated);
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    const job = await Job_1.default.findById(req.params.id);
    if (!job)
        return res.status(404).json({ message: 'Job not found' });
    if (job.user.toString() !== req.user?.id && req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    await job.deleteOne();
    return res.json({ message: 'Job deleted' });
};
exports.deleteJob = deleteJob;
