import pLimit from "p-limit";
import { LinkedInJob } from "./types.js";
import fetchJob from "./fetchingJob.js";
import shouldAcceptJob from "./approveByFormula.js";
import { JobDescriptionAttributes } from "./types.js";
import * as jobServices from "../services/job.services.js";
import * as jobDescriptionServices from "../services/jobDescription.services.js";
import * as jobKeywordServices from "../services/jobKeyword.services.js";

const limit = pLimit(5);

export interface IJobResult {
  created: boolean;
  existed: boolean;
  descriptionCreated: boolean;
  failed: boolean;
  id: string;
}

export const processJobsWithKeyword = async (
  jobs: LinkedInJob[],
  keywordId: number,
  postedBy: string,
  seenIds: Set<string> = new Set()
): Promise<{
  results: IJobResult[];
  createdJobIds: Set<string>;
  loopedInOtherKeywords: number;
}> => {
  const createdJobsIds = new Set<string>();
  let jobsLoopedInOtherKeywords = 0;

  const jobPromises = jobs.map((job) =>
    limit(async (): Promise<IJobResult> => {
      if (seenIds.has(job.id)) {
        jobsLoopedInOtherKeywords++;
        await jobKeywordServices.createJobKeyword(job.id, keywordId);
        return {
          created: false,
          existed: true,
          descriptionCreated: false,
          failed: false,
          id: job.id,
        };
      }

      seenIds.add(job.id);
      let approvedByFormula = "pending";
      let description = "";

      const existingJob = await jobServices.getJobById(job.id);
      if (existingJob) {
        createdJobsIds.add(existingJob.dataValues.id);
        return {
          created: false,
          existed: true,
          descriptionCreated: false,
          failed: false,
          id: existingJob.dataValues.id,
        };
      }

      try {
        description = await fetchJob(job.url);
        if (description) {
          approvedByFormula = (await shouldAcceptJob({ description }, 4)) ? "yes" : "no";
        }
      } catch (error) {
        console.error("fetchJob error:", error);
        return {
          created: false,
          descriptionCreated: false,
          failed: true,
          existed: false,
          id: job.id,
        };
      }

      try {
        const returnedJob = await jobServices.createJob(
          job,
          approvedByFormula,
          keywordId,
          postedBy
        );

        if (!returnedJob) {
          return {
            created: false,
            descriptionCreated: false,
            failed: true,
            existed: false,
            id: job.id,
          };
        }

        if (returnedJob.createdJob) {
          createdJobsIds.add(returnedJob.newJob.dataValues.id);
        }

        if (!description || !returnedJob.createdJob) {
          return {
            created: returnedJob.createdJob,
            descriptionCreated: false,
            failed: !returnedJob.createdJob,
            existed: false,
            id: job.id,
          };
        }

        const jobDescriptionData: JobDescriptionAttributes = {
          id: job.id,
          state: "LISTED",
          description,
        };

        const returnedJobDescription = await jobDescriptionServices.createJobDescription(
          jobDescriptionData
        );

        return {
          created: true,
          descriptionCreated: !!returnedJobDescription,
          failed: false,
          existed: false,
          id: returnedJob.newJob.dataValues.id,
        };
      } catch (error) {
        console.error("createJob or jobDescription error:", error);
        return {
          created: false,
          descriptionCreated: false,
          failed: true,
          existed: false,
          id: job.id,
        };
      }
    })
  );

  const results = await Promise.all(jobPromises);
  return {
    results,
    createdJobIds: createdJobsIds,
    loopedInOtherKeywords: jobsLoopedInOtherKeywords,
  };
};

