import { CoverLetter, Job, Keyword } from "../models/index.js";

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

export const createJob = async (job, keyword) => {
  // job
  // {
  //   id: '3971859528',
  //   title: '解释器开发工程师｜Interpreter  Developer',
  //   url: 'https://www.linkedin.com/jobs/view/3971859528',
  //   referenceId: 'hPiXoh2iD/eB5e1k5Fi3JQ==',
  //   posterId: '947263984',
  //   company: {
  //     name: 'Gate.io',
  //     logo: 'https://media.licdn.com/dms/image/v2/D560BAQG88tXsEE6cvQ/company-logo_200_200/company-logo_200_200/0/1724666407172/gateio_logo?e=1735171200&v=beta&t=2-JxU4zK7K9Rftl9W66m3O5kSYOaJGBadeq50uludKM',
  //     url: 'https://www.linkedin.com/company/gateio/life',
  //     staffCountRange: {},
  //     headquarter: {}
  //   }
  try {
    const keywordInstance = await Keyword.findOne({
      where: {
        keyword
      },
    });
    const [newJob, created] = await Job.findOrCreate({where: {id: job.id}, defaults: {
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
    }});
    await newJob.addKeyword(keywordInstance);
    return newJob;
  } catch (error) {
    console.log("🚀 ~ createJob ~ error:", error);
  }
};

export const bulkCreateJobs = async (jobs, keyword) => {
  try {
    const keywordInstance = await Keyword.findOne({
      where: {
        keyword
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
