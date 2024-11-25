import * as jobService from "../services/job.services.js";
import * as linkedInApi from "../linkedin_api/index.js";
import { saveToFile } from "../utils/pythonFunctions.cjs";

export const getAllJobs = async (req, res) => {
  const options = { ...req.query };

  const whereClause = {};
  const validValues = ["yes", "no", "pending"];

  // Loop through each query parameter
  for (const [key, value] of Object.entries(options)) {
    // Check if the parameter is approvedByFormula and validate it
    if (key === "approvedByFormula" || key === "approvedByGPT") {
      if (validValues.includes(value)) {
        whereClause[key] = value; // Only add if valid
      }
    } else if (value !== undefined) {
      // For other parameters, add them as-is if they are defined
      whereClause[key] = value;
    }
  }

  try {
    const jobs = await jobService.getAllJobs(whereClause);
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllJobs ~ error:", error);
  }
};

export const getAllJobsWithDescription = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobsWithDescription();
    return jobs;
    // return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllJobs ~ error:", error);
  }
};

export const saveJobsToFile = async (req, res) => {
  const options = req.query;
  try {
    const jobs = await jobService.getAllJobs(options);
    // python function to save to file
    const saveToFilePath = await saveToFile(jobs);
    console.log("🚀 ~ saveJobsToFile ~ saveToFilePath:", saveToFilePath);
    if (saveToFilePath) {
      return res.status(200).json({ message: "File saved successfully" });
    }
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

export const searchAndCreateJobs = async (req, res) => {
  // const { jobInfo, keywords } = req.body;
  const { keywords, locationId, datePosted, sort } = req.query;
  try {
    const jobs = await linkedInApi.filterJobs({
      keywords,
      locationId,
      datePosted,
      sort,
    });
    if (!jobs || jobs.length === 0) {
      console.log("🚀 ~ searchAndCreateJobs ~ jobs:", "No jobs found");
      return res.status(404).send("No jobs found");
    }
    let jobsCreated = 0;
    for (const job of jobs.data) {
      const createdJob = await jobService.createJob(job, keywords);
      if (createdJob) {
        jobsCreated++;
      }
    }
    return res
      .status(201)
      .send(`Created ${jobsCreated} jobs out of ${jobs.total}`);
  } catch (error) {
    console.log("🚀 ~ createJob ~ error:", error);
    return res.status(500).send("An error occurred while creating jobs.");
  }
};

export const bulkCreateJobs = async (req, res) => {
  const { jobsInfoArray, keywords } = req.body;
  try {
    const jobs = await jobService.bulkCreateJobs(jobsInfoArray, keywords);
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

export const approveByGPT = async (req, res) => {
  const jobs = await getAllJobsWithDescription();
  if (jobs.length === 0) {
    return res.status(404).send("No jobs found");
  }
  try {
    const jobsApproved = await jobService.approveByGPT(jobs);
    return res.status(200).json(jobsApproved);
  } catch (error) {
    console.log("🚀 ~ updateJob ~ error:", error);
  }
};
