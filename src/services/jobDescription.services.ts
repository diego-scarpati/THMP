import { fetchJobDetails } from "../linkedin_api/index";
import { JobDescription } from "../models/index";
import { JobDescriptionAttributes, JobAttributes } from "../utils/types";
import * as jobServices from "../services/job.services";
// import { acceptByFormula } from "../utils/pythonFunctions.cjs";
import shouldAcceptJob from "../utils/approveByFormula";

export const getAllJobDescriptions = async (): Promise<JobDescriptionAttributes[]> => {
  try {
    const jobDescriptions = await JobDescription.findAll();
    return jobDescriptions;
  } catch (error) {
    console.log("🚀 ~ getAllJobDescriptions ~ error:", error);
  }
};

export const getJobDescriptionById = async (
  id: string
): Promise<JobDescriptionAttributes | null> => {
  try {
    const jobDescription = await JobDescription.findByPk(id);
    return jobDescription;
  } catch (error) {
    console.log("🚀 ~ getJobDescriptionById ~ error:", error);
  }
};

export const createJobDescription = async (
  jobDescription: JobDescriptionAttributes
): Promise<JobDescriptionAttributes | null> => {
  try {
    const newJobDescription = await JobDescription.create({
      id: jobDescription.id,
      state: jobDescription.state,
      description: jobDescription.description,
    });
    return newJobDescription;
  } catch (error) {
    console.log("🚀 ~ createJobDescription ~ error:", error);
  }
};

export const loopAndCreateJobDescription = async (
  jobsToCreateDescriptions: JobAttributes[]
): Promise<string | null> => {
  try {
    let jobDescriptionsCreated = 0;
    let jobAlreadyCreated = 0;
    let jobDescriptionNotFound = 0;
    for (const job of jobsToCreateDescriptions) {
      /**
       * Before fetching the job description, check if the job description already exists
       */
      const jobDescriptionExists = await JobDescription.findByPk(job.id);
      if (jobDescriptionExists) {
        // console.log(
        //   "🚀 ~ loopAndCreateJobDescription ~ jobDescriptionExists:",
        //   jobDescriptionExists
        // );
        jobAlreadyCreated++;
        continue;
      }
      const jobDescription = await fetchJobDetails(job.id);
      if (!jobDescription) {
        // console.log(
        //   "🚀 ~ loopAndCreateJobDescription ~ jobDescription:",
        //   jobDescription
        // );
        jobDescriptionNotFound++;
        continue;
      } else {
        const jobDescriptionCreated = await JobDescription.create({
          id: job.id,
          state: jobDescription.state,
          description: jobDescription.description,
          companyApplyUrl: jobDescription.applyMethod.companyApplyUrl || null,
          easyApplyUrl: jobDescription.applyMethod.easyApplyUrl || null,
          workRemoteAllowed: jobDescription.workRemoteAllowed || null,
          workPlace: jobDescription.workPlace || null,
          formattedExperienceLevel: jobDescription.formattedExperienceLevel || null,
          skills: jobDescription.skills ? jobDescription.skills.join(", ") : null,
        });
        if (jobDescriptionCreated) {
          jobDescriptionsCreated++;
          const approved = await shouldAcceptJob(
            {
              description: jobDescription.description,
              skills: jobDescription.skills,
            },
            4
          );
          await jobServices.updateJob(job.id, {
            approvedByFormula: approved ? "yes" : "no",
            easyApply: jobDescriptionCreated.dataValues.easyApplyUrl ? "yes" : "no",
          });
        }
      }
    }
    return `Job descriptions created: ${jobDescriptionsCreated} out of ${jobsToCreateDescriptions.length}. ${jobAlreadyCreated} job descriptions already created. ${jobDescriptionNotFound} job descriptions not found by API.`;
  } catch (error) {
    console.log("🚀 ~ createJobDescription ~ error:", error);
    return null;
  }
};
