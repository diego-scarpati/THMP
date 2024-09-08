import * as jobService from "../services/job.services";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllJobs ~ error:", error);
  }
};

export const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await jobService.getJobById(id);
    return res.status(200).json(job);
  } catch (error) {
    console.log("🚀 ~ getJobById ~ error:", error);
  }
};

export const getAllByAccepetance = async (req, res) => {
  const { formulaAcceptance, gptAcceptance } = req.query;
  if (!formulaAcceptance && !gptAcceptance) {
    return res.status(400).json({ message: "Missing query params" });
  }
  try {
    const jobs = await jobService.getAllByAccepetance(
      formulaAcceptance,
      gptAcceptance
    );
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllByAccepetance ~ error:", error);
  }
};

export const getAllByCoverLetter = async (req, res) => {
  try {
    const jobs = await jobService.getAllByCoverLetter();
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllByCoverLetter ~ error:", error);
  }
};

export const getAllApplied = async (req, res) => {
  try {
    const jobs = await jobService.getAllApplied();
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllApplied ~ error:", error);
  }
};

export const getAllRejected = async (req, res) => {
  try {
    const jobs = await jobService.getAllRejected();
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllApplied ~ error:", error);
  }
};

export const createJob = async (req, res) => {
  const { jobInfo } = req.body;
  try {
    const job = await jobService.createJob(jobInfo);
    return res.status(201).json(job);
  } catch (error) {
    console.log("🚀 ~ createJob ~ error:", error);
  }
};

export const bulkCreateJobs = async (req, res) => {
  const { jobsInfoArray } = req.body;
  try {
    const jobs = await jobService.bulkCreateJobs(jobsInfoArray);
    return res.status(201).json(jobs);
  } catch (error) {
    console.log("🚀 ~ bulkCreateJobs ~ error:", error);
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { jobInfo } = req.body;
  try {
    const job = await jobService.updateJob(id, jobInfo);
    return res.status(200).json(job);
  } catch (error) {
    console.log("🚀 ~ updateJob ~ error:", error);
  }
};
