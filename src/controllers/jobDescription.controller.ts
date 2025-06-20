import * as jobDescriptionServices from "../services/jobDescription.services";
import * as jobServices from "../services/job.services";
import { JobAttributes, JobDescriptionAttributes } from "../utils/types";

export const getAllJobDescriptions = async (req, res) => {
  try {
    const jobDescriptions = await jobDescriptionServices.getAllJobDescriptions();
    return res.status(200).json(jobDescriptions);
  } catch (error) {
    console.log("🚀 ~ getAllJobDescriptions ~ error:", error);
  }
};

export const getJobDescriptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const jobDescription = await jobDescriptionServices.getJobDescriptionById(id);
    return res.status(200).json(jobDescription);
  } catch (error) {
    console.log("🚀 ~ getJobDescriptionById ~ error:", error);
  }
};

export const createJobDescription = async (req, res) => {
  const { jobDescription } = req.body;
  try {
    const newJobDescription = await jobDescriptionServices.createJobDescription(jobDescription);
    return res.status(201).json(newJobDescription);
  } catch (error) {
    console.log("🚀 ~ createJobDescription ~ error:", error);
  }
};

export const loopAndCreateJobDescription = async (req, res) => {
  try {
    const jobsToCreateDescriptions = await jobServices.getAllJobs({
      where: {
        approvedByFormula: "pending",
        easyApply: "pending",
      },
    });
    if (!jobsToCreateDescriptions) {
      return res.status(404).send("No jobs found");
    }
    const jobsData: JobAttributes[] = jobsToCreateDescriptions.data.map(
      (job) => job.dataValues as JobAttributes
    );
    const newJobDescriptions = await jobDescriptionServices.loopAndCreateJobDescription(jobsData);
    return res.status(201).send(newJobDescriptions);
  } catch (error) {
    console.log("🚀 ~ createJobDescription ~ error:", error);
  }
};
