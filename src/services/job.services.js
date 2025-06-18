import { Op } from "sequelize";
import { CoverLetter, Job, JobDescription, Keyword } from "../models/index.js";
// import {
//   acceptByFormula,
//   gptApproval,
//   resume,
//   rejectingSkills
// } from "../utils/pythonFunctions.cjs";
import {
  nonLatinPattern,
  shouldExcludeIftitle,
  shouldHaveInTitle,
  excludeDotNet,
  excludeCs,
  excludeCSharp,
  excludeCPlusPlus,
} from "../utils/regex.js";
import { approveByAssistantGPT } from "../utils/assistants.cjs";
import shouldAcceptJob from "../utils/approveByFormula.cjs";

export const getAllJobs = async (whereClause) => {
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

export const getJobById = async (id) => {
  try {
    const job = await Job.findByPk(id);
    return job;
  } catch (error) {
    console.log("🚀 ~ getJobById ~ error:", error);
  }
};

export const getJobsByCompanyName = async (companyName) => {
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
  }
};

export const getAllByAccepetance = async (formulaAcceptance, gptAcceptance) => {
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
  }
};

export const getAllByCoverLetter = async () => {
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
  }
};

export const getAllApplied = async () => {
  try {
    const jobs = await Job.findAll({
      where: {
        applied: true,
      },
    });
    return jobs;
  } catch (error) {
    console.log("🚀 ~ getAllApplied ~ error:", error);
  }
};

export const getAllRejected = async () => {
  try {
    const jobs = await Job.findAll({
      where: {
        rejected: true,
      },
    });
    return jobs;
  } catch (error) {
    console.log("🚀 ~ getAllApplied ~ error:", error);
  }
};

export const createJob = async (job, approvedByFormula, keyword) => {
  try {
    const [newKeyword] = await Keyword.findOrCreate({
      where: {
        keyword,
      },
      defaults: {
        keyword,
      },
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
      },
    });
    await newJob.addKeyword(newKeyword);
    return { newJob, createdJob };
  } catch (error) {
    console.log("🚀 ~ createJob ~ error:", error);
  }
};

export const bulkCreateJobs = async (jobs, keyword) => {
  try {
    const keywordInstance = await Keyword.findOne({
      where: {
        keyword,
      },
    });
    const newJobs = await Job.bulkCreate(jobs, { ignoreDuplicates: true });
    // Ensure all keyword associations are created before returning
    await Promise.all(
      newJobs.map(async (job) => {
        await job.addKeyword(keywordInstance);
      })
    );
    return newJobs;
  } catch (error) {
    console.log("🚀 ~ bulkCreateJobs ~ error:", error);
  }
};

// Used as a service in jobDescription.services.loopAndCreateJobDescription
export const updateJob = async (id, jobInfo) => {
  try {
    const updatedJob = await Job.update(jobInfo, {
      where: {
        id,
      },
    });
    return updatedJob;
  } catch (error) {
    console.log("🚀 ~ updateJob ~ error:", error);
  }
};

export const updateApprovedByDate = async (jobId) => {
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
  }
};

export const approveByGPT = async (jobs) => {
  let jobsApproved = 0;
  for (const job of jobs) {
    // console.log("🚀 ~ approveByGPT ~ job:", job)
    const jobDescription =
      job.dataValues.JobDescription?.dataValues?.description || null;
    // console.log("🚀 ~ approveByGPT ~ jobDescription:", jobDescription)
    if (!jobDescription) {
      console.log("🚀 ~ approveByGPT ~ job:", job.id);
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
            id: job.id,
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

export const approveByFormula = async (jobs) => {
  let jobsApproved = 0;
  for (const job of jobs) {
    const today = new Date();
    const postDate = new Date(job.dataValues.postDate);
    const shouldRejectByPostDate = today - postDate > 7 * 24 * 60 * 60 * 1000;

    if (shouldRejectByPostDate) {
      console.log(
        "🚀 ~ approveByFormula ~ shouldRejectByPostDate:",
        shouldRejectByPostDate
      );
      try {
        await Job.update(
          { approvedByFormula: "no" },
          {
            where: {
              id: job.id,
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
              id: job.id,
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

export const filterByJobTitle = async (jobs) => {
  let jobsApproved = 0;
  for (const job of jobs) {
    if (job.approvedByFormula === "yes") {
      jobsApproved++;
      continue;
    }
    if (job.approvedByFormula === "no") {
      continue;
    }
    const approved =
      !shouldExcludeIftitle.test(job.title) &&
      !nonLatinPattern.test(job.title) &&
      !excludeDotNet.test(job.title) &&
      // !excludeCs.test(job.title) &&
      !excludeCSharp.test(job.title) &&
      !excludeCPlusPlus.test(job.title) &&
      shouldHaveInTitle.test(job.title);
    try {
      await Job.update(
        { approvedByFormula: approved ? "yes" : "no" },
        {
          where: {
            id: job.id,
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
