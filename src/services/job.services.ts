import { Op } from "sequelize";
import { CoverLetter, Job, JobDescription, Keyword } from "../models/index.js";
import { JobAttributes } from "../utils/types.js";
import {
  nonLatinPattern,
  shouldExcludeIftitle,
  shouldHaveInTitle,
  excludeDotNet,
  excludeCSharp,
  excludeCPlusPlus,
} from "../utils/regex.js";
import { approveByAssistantGPT } from "../utils/assistants.js";
import shouldAcceptJob from "../utils/approveByFormula.js";
import db from "../db/connection.js";
import * as jobKeywordService from "./jobKeyword.services.js";

export const getAllJobs = async (
  whereClause: any
): Promise<{ total: number; data: Job[] } | undefined> => {
  const { where, include, limit, offset, order } = whereClause;
  console.log("🚀 ~ getAllJobs ~ whereClause:", whereClause);
  // console.log("🚀 ~ getAllJobs ~ where:", where)

  const total = await Job.count({ where, logging: console.log });
  console.log("🚀 ~ getAllJobs ~ total:", total);

  try {
    const jobs = await Job.findAll({
      where,
      include,
      order,
      limit,
      offset,
      logging: console.log,
    });
    return {
      total, // Total number of records
      data: jobs, // Paginated data
    };
  } catch (error) {
    console.log("🚀 ~ getAllJobs ~ error:", error);
  }
};

export const getJobById = async (id: string): Promise<Job | null> => {
  try {
    const job = await Job.findByPk(id);
    return job;
  } catch (error) {
    console.log("🚀 ~ getJobById ~ error:", error);
    return null;
  }
};

export const getJobsByCompanyName = async (companyName: string): Promise<Job[]> => {
  try {
    const jobs = await Job.findAll({
      where: {
        company: {
          [Op.substring]: companyName,
        },
      },
      include: [
        {
          model: JobDescription,
          attributes: ["description", "skills"],
          required: false,
        },
      ],
    });
    return jobs;
  } catch (error) {
    console.log("🚀 ~ getJobsByCompanyName ~ error:", error);
    return [];
  }
};

export const getAllByAccepetance = async (
  formulaAcceptance: string | undefined,
  gptAcceptance: string | undefined
): Promise<Job[]> => {
  try {
    const jobs = await Job.findAll({
      where: {
        formulaAcceptance: formulaAcceptance ? formulaAcceptance : undefined,
        gptAcceptance: gptAcceptance ? gptAcceptance : undefined,
      },
    });
    return jobs;
  } catch (error) {
    console.log("🚀 ~ getAllByAccepetance ~ error:", error);
    return [];
  }
};

export const getAllByCoverLetter = async (): Promise<Job[]> => {
  try {
    const jobs = await Job.findAll({
      include: {
        model: CoverLetter,
        where: {
          coverLetter: {
            [Op.not]: null,
          },
        },
      },
    });
    return jobs;
  } catch (error) {
    console.log("🚀 ~ getAllByCoverLetter ~ error:", error);
    return [];
  }
};

export const getAllApplied = async (): Promise<Job[]> => {
  try {
    const jobs = await Job.findAll({
      where: {
        applied: true,
      },
    });
    return jobs;
  } catch (error) {
    console.log("🚀 ~ getAllApplied ~ error:", error);
    return [];
  }
};

export const getAllRejected = async (): Promise<Job[]> => {
  try {
    const jobs = await Job.findAll({
      where: {
        rejected: true,
      },
    });
    return jobs;
  } catch (error) {
    console.log("🚀 ~ getAllApplied ~ error:", error);
    return [];
  }
};

export const createJob = async (
  job: any,
  approvedByFormula: string,
  keyword: string,
  postedBy: string
): Promise<{ newJob: Job; createdJob: boolean } | undefined> => {
  const transaction = await db.transaction();
  console.log("🚀 ~ keyword:", keyword);
  console.log("🚀 ~ approvedByFormula:", approvedByFormula);
  console.log("🚀 ~ job:", job);
  try {
    const [newKeyword] = await Keyword.findOrCreate({
      where: {
        keyword,
      },
      defaults: {
        keyword,
      },
      transaction,
    });
    const [newJob, createdJob] = await Job.findOrCreate({
      where: { id: job.id },
      defaults: {
        id: Number(job.id),
        title: job.title,
        url: job.url,
        referenceId: job.referenceId || null,
        posterId: job.posterId || null,
        company: job.company.name,
        location: job.location || null,
        type: job.type || null,
        postDate: job.postAt || null,
        benefits: job.benefits || null,
        approvedByFormula: approvedByFormula || "pending",
        postedBy: postedBy || "LinkedIn",
      },
      transaction,
    });
    console.log("🚀 ~ createdJob:", createdJob);
    console.log("🚀 ~ newJob:", newJob);
    if (!newJob || !newJob.dataValues.id) {
      throw new Error("Job creation failed or job does not exist in DB");
    }
    await (newJob as any).addKeyword(newKeyword, { transaction });
    await transaction.commit();
    return { newJob, createdJob };
  } catch (error) {
    await transaction.rollback();
    console.log("🚀 ~ createJob ~ error:", error);
  }
};

export const bulkCreateJobs = async (jobs: any[], keyword: string): Promise<Job[] | undefined> => {
  try {
    const keywordInstance = await Keyword.findOne({
      where: {
        keyword,
      },
    });
    const newJobs = await Job.bulkCreate(jobs, { ignoreDuplicates: true });
    await newJobs.forEach(async (job) => {
      await (job as any).addKeyword(keywordInstance);
    });
    return newJobs;
  } catch (error) {
    console.log("🚀 ~ bulkCreateJobs ~ error:", error);
  }
};

// Used as a service in jobDescription.services.loopAndCreateJobDescription
export const updateJob = async (
  id: string,
  jobInfo: Partial<JobAttributes>
): Promise<[number] | undefined> => {
  try {
    const updatedJob = await Job.update(jobInfo, {
      where: {
        id,
      },
    });
    return updatedJob;
  } catch (error) {
    console.log("🚀 ~ updateJob ~ error:", error);
    return undefined;
  }
};

export const updateApprovedByDate = async (jobId: string): Promise<[number] | undefined> => {
  try {
    const updatedJob = await Job.update(
      { easyApply: "yes" },
      {
        where: {
          id: jobId,
        },
      }
    );
    return updatedJob;
  } catch (error) {
    console.log("🚀 ~ updateJob ~ error:", error);
    return undefined;
  }
};

export const approveByGPT = async (jobs: Job[]): Promise<string> => {
  let jobsApproved = 0;
  for (const job of jobs) {
    // console.log("🚀 ~ approveByGPT ~ job:", job)
    const today = new Date();
    const postDate = new Date(job.dataValues.postDate);
    const shouldRejectByPostDate = today.getTime() - postDate.getTime() > 10 * 24 * 60 * 60 * 1000;
    if (shouldRejectByPostDate) {
      console.log("🚀 ~ approveByGPT ~ shouldRejectByPostDate:", shouldRejectByPostDate);
      try {
        await Job.update(
          { approvedByGPT: "no" },
          {
            where: {
              id: job.dataValues.id,
            },
          }
        );
      } catch (error) {
        console.log("🚀 ~ updateJob ~ error:", error);
      }
      continue;
    }
    const jobDescription = job.dataValues.JobDescription?.dataValues?.description || null;
    // console.log("🚀 ~ approveByGPT ~ jobDescription:", jobDescription)
    if (!jobDescription) {
      console.log("🚀 ~ approveByGPT ~ job:", job.dataValues.id);
      continue;
    }
    const approved = await approveByAssistantGPT({
      description: job.dataValues.JobDescription.dataValues.description,
      // skills: job.dataValues.JobDescription.dataValues.skills,
    });
    console.log("🚀 ~ approveByGPT ~ approved:", approved);
    try {
      await Job.update(
        { approvedByGPT: approved },
        {
          where: {
            id: job.dataValues.id,
          },
        }
      );
    } catch (error) {
      console.log("🚀 ~ updateJob ~ error:", error);
    }
    if (approved === "yes") jobsApproved++;
  }
  return `Jobs approved: ${jobsApproved} out of ${jobs.length}`;
};

export const approveByFormula = async (jobs: Job[]): Promise<string> => {
  let jobsApproved = 0;
  for (const job of jobs) {
    const today = new Date();
    const postDate = new Date(job.dataValues.postDate);
    const shouldRejectByPostDate = today.getTime() - postDate.getTime() > 7 * 24 * 60 * 60 * 1000;

    if (shouldRejectByPostDate) {
      console.log("🚀 ~ approveByFormula ~ shouldRejectByPostDate:", shouldRejectByPostDate);
      try {
        await Job.update(
          { approvedByFormula: "no" },
          {
            where: {
              id: job.dataValues.id,
            },
          }
        );
      } catch (error) {
        console.log("🚀 ~ updateJob ~ error:", error);
      }
    } else {
      const approved = await shouldAcceptJob(
        {
          description: job.dataValues.JobDescription.description,
          skills: job.dataValues.JobDescription.skills,
        },
        4
      );
      console.log("🚀 ~ approveByFormula ~ approved:", approved);
      try {
        await Job.update(
          { approvedByFormula: approved ? "yes" : "no" },
          {
            where: {
              id: job.dataValues.id,
            },
          }
        );
      } catch (error) {
        console.log("🚀 ~ updateJob ~ error:", error);
      }
      if (approved) jobsApproved++;
    }
  }
  return `Jobs approved: ${jobsApproved} out of ${jobs.length}`;
};

export const filterByJobTitle = async (jobs: Job[]): Promise<string> => {
  let jobsApproved = 0;
  for (const job of jobs) {
    if (job.dataValues.approvedByFormula === "yes") {
      jobsApproved++;
      continue;
    }
    if (job.dataValues.approvedByFormula === "no") {
      continue;
    }
    const approved =
      !shouldExcludeIftitle.test(job.dataValues.title) &&
      !nonLatinPattern.test(job.dataValues.title) &&
      !excludeDotNet.test(job.dataValues.title) &&
      !excludeCSharp.test(job.dataValues.title) &&
      !excludeCPlusPlus.test(job.dataValues.title) &&
      shouldHaveInTitle.test(job.dataValues.title);
    try {
      await Job.update(
        { approvedByFormula: approved ? "yes" : "no" },
        {
          where: {
            id: job.dataValues.id,
          },
        }
      );
    } catch (error) {
      console.log("🚀 ~ updateJob ~ error:", error);
    }
    if (approved) jobsApproved++;
  }
  return `Jobs approved: ${jobsApproved} out of ${jobs.length}`;
};

// Add keyword to job instance getting job with job id
export const addKeywordToJob = async (jobId: string, keyword: string): Promise<Job | null> => {
  const job = await Job.findByPk(jobId);
  const [newKeyword] = await Keyword.findOrCreate({
    where: {
      keyword,
    },
    defaults: {
      keyword,
    },
  });
  await jobKeywordService.createJobKeyword(jobId, newKeyword.dataValues.id);
  return job;
};
