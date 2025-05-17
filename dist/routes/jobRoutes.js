"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = require("../controllers/jobController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management
 */
/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 */
router.get("/", jobController_1.getJobs);
/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Job'

 *     responses:
 *       201:
 *         description: Job created
 */
router.route("/").get(jobController_1.getJobs).post(authMiddleware_1.protect, jobController_1.createJob);
router
    .route("/:id")
    .get(jobController_1.getJobById)
    .patch(authMiddleware_1.protect, jobController_1.updateJob)
    .delete(authMiddleware_1.protect, jobController_1.deleteJob);
exports.default = router;
