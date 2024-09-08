import { CoverLetter, Job } from "../models";

export const getAllJobs = async () => {
  try {
    const jobs = await Job.findAll();
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
      // where: {
      //   coverLetter: {
      //     [Op.not]: null,
      //   },
      // },
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

export const createJob = async (job) => {
  try {
    const newJob = await Job.create(...job);
    return newJob;
  } catch (error) {
    console.log("🚀 ~ createJob ~ error:", error);
  }
};

export const bulkCreateJobs = async (jobs) => {
  try {
    const newJobs = await Job.bulkCreate(jobs, { ignoreDuplicates: true });
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
