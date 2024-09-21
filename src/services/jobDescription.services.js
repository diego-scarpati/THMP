import { JobDescription } from "../models/index.js";

export const getAllJobDescriptions = async () => {
  try {
    const jobDescriptions = await JobDescription.findAll();
    return jobDescriptions;
  } catch (error) {
    console.log("🚀 ~ getAllJobDescriptions ~ error:", error);
  }
};

export const getJobDescriptionById = async (id) => {
  try {
    const jobDescription = await JobDescription.findByPk(id);
    return jobDescription;
  } catch (error) {
    console.log("🚀 ~ getJobDescriptionById ~ error:", error);
  }
};

export const createJobDescription = async (jobDescription) => {
  try {
    const newJobDescription = await JobDescription.create(...jobDescription);
    return newJobDescription;
  } catch (error) {
    console.log("🚀 ~ createJobDescription ~ error:", error);
  }
};
