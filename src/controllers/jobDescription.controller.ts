import * as jobDescriptionServices from "../services/jobDescription.services.ts";
import * as jobServices from "../services/job.services.ts";

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
    const newJobDescriptions = await jobDescriptionServices.loopAndCreateJobDescription(
      jobsToCreateDescriptions.data
    );
    return res.status(201).send(newJobDescriptions);
  } catch (error) {
    console.log("🚀 ~ createJobDescription ~ error:", error);
  }
};
