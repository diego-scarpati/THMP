import { fetchJobDetails } from "../linkedin_api/index.js";
import { JobDescription } from "../models/index.js";
import * as jobServices from "../services/job.services.js";
import { acceptByFormula } from "../utils/pythonFunctions.cjs";

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

export const loopAndCreateJobDescription = async (jobsToCreateDescriptions) => {
  try {
    let jobDescriptionsCreated = 0;
    for (const job of jobsToCreateDescriptions) {
      // const jobDescription = await fetchJobDetails(Number(job.jobId));
      const jobDescription = await fetchJobDetails(job.id);
      if (!jobDescription) {
        console.log(
          "🚀 ~ loopAndCreateJobDescription ~ jobDescription:",
          jobDescription
        );
      } else {
        const [jobDescriptionCreated, created] =
          await JobDescription.findOrCreate({
            where: { id: job.id },
            defaults: {
              id: job.id,
              state: jobDescription.state,
              description: jobDescription.description,
              companyApplyUrl:
                jobDescription.applyMethod.companyApplyUrl || null,
              easyApplyUrl: jobDescription.applyMethod.easyApplyUrl || null,
              workRemoteAllowed: jobDescription.workRemoteAllowed || null,
              workPlace: jobDescription.workPlace || null,
              formattedExperienceLevel:
                jobDescription.formattedExperienceLevel || null,
              skills: jobDescription.skills
                ? jobDescription.skills.join(", ")
                : null,
            },
          });
        console.log(
          "🚀 ~ loopAndCreateJobDescription ~ jobDescriptionCreated:",
          jobDescriptionCreated
        );
        console.log(
          "🚀 ~ loopAndCreateJobDescription ~ jobDescriptionCreated.dataValues:",
          jobDescriptionCreated.dataValues
        );
        if (created) {
          jobDescriptionsCreated++;
          const approved = await acceptByFormula(jobDescription);
          console.log("🚀 ~ loopAndCreateJobDescription ~ approved:", approved);
          await jobServices.updateJob(job.id, {
            approvedByFormula: approved ? "yes" : "no",
            easyApply: jobDescriptionCreated.dataValues.easyApplyUrl
              ? "yes"
              : "no",
          });
        }
      }
    }
    return `Job descriptions created: ${jobDescriptionsCreated} out of ${jobsToCreateDescriptions.length}`;
  } catch (error) {
    console.log("🚀 ~ createJobDescription ~ error:", error);
  }
};
