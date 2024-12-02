import { CoverLetter, Job, JobDescription, Keyword } from "../models/index.js";
import {
  acceptByFormula,
  gptApproval,
  resume,
} from "../utils/pythonFunctions.cjs";

export const getAllJobs = async (whereClause) => {
  try {
    const jobs = await Job.findAll({
      where: {
        ...whereClause,
      },
      include: {
        model: Keyword,
        attributes: ["keyword"],
        through: { attributes: [] },
      },
    });
    return jobs;
  } catch (error) {
    console.log("🚀 ~ getAllJobs ~ error:", error);
  }
};

export const getAllJobsWithDescription = async () => {
  try {
    const jobs = await Job.findAll({
      where: {
        approvedByGPT: "pending",
        easyApply: "yes",
        approvedByFormula: "yes",
      },
      include: {
        model: JobDescription,
        attributes: ["description"],
      },
      raw: true,
      nest: true,
    });
    // console.log("🚀 ~ getAllJobsWithDescription ~ jobs", jobs);
    // console.log("🚀 ~ getAllJobsWithDescription ~ jobs.JobDescription:", jobs[0].JobDescription.description);
    return jobs;
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

export const createJob = async (job, keyword) => {
  try {
    const [newKeyword, createdKeyword] = await Keyword.findOrCreate({
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
      },
    });
    await newJob.addKeyword(newKeyword);
    return newJob;
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
    await newJobs.forEach(async (job) => {
      await job.addKeyword(keywordInstance);
    });
    return newJobs;
  } catch (error) {
    console.log("🚀 ~ bulkCreateJobs ~ error:", error);
  }
};

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

export const approveByGPT = async (jobs) => {
  let jobsApproved = 0;
  for (const job of jobs) {
    const approved = await gptApproval(job.JobDescription.description, resume);
    try {
      const approveJob = await Job.update(
        { approvedByGPT: approved ? "yes" : "no" },
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

// export const checkJobDescription = async (newJobDescription) => {
//   try {
//     const approved = await acceptByFormula(newJobDescription)
//     console.log("🚀 ~ checkJobDescription ~ approved:", approved)
//     return approved
//   } catch (error) {
//     console.log("🚀 ~ createJobDescription ~ error:", error);
//   }
// }
