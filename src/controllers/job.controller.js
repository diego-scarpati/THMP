import * as jobServices from "../services/job.services.js";
import * as keywordServices from "../services/keyword.services.js";
import * as linkedInApi from "../linkedin_api/index.js";
import { saveToFile } from "../utils/pythonFunctions.cjs";
import { CoverLetter, Job, JobDescription, Keyword } from "../models/index.js";

const modelOptions = [
  // Model parameters
  "id",
  "title",
  "url",
  "referenceId",
  "posterId",
  "company",
  "location",
  "type",
  "postDate",
  "benefits",
  "approvedByFormula",
  "approvedByGPT",
  "easyApply",
  // Include parameters
  "keywords",
  "jobDescriptions",
  "skills",
  // SQL Parameters
  "limit",
  "page",
  "created",
];

// Location IDs
// const locationId = {
//   "sydney"
// }

export const getAllJobs = async (req, res) => {
  const options = { ...req.query };

  // Options should only contain the keys that are in the modelOptions array
  for (const key in options) {
    if (!modelOptions.includes(key)) {
      delete options[key];
    }
  }

  let page = options.page ? parseInt(options.page) : 1;
  if (options.page) {
    page = options.page ? parseInt(options.page) : 1;
    delete options.page;
  }

  // Should separate the where clause from the include, limit, page, offset and order clauses
  const whereClause = {
    where: {},
    include: [],
    order: [
      options.created === "desc"
        ? ["createdAt", "DESC"]
        : options.postDate === "desc"
          ? ["postDate", "DESC"]
          : ["createdAt", "ASC"],
    ],
    limit: options.limit ? parseInt(options.limit) : 50,
    offset: (page - 1) * (options.limit ? parseInt(options.limit) : 50),
  };

  if (whereClause.order.includes(undefined)) {
    delete whereClause.order;
  }

  // Loop through options and modify whereClause accordingly
  for (const key in options) {
    // Switch case for the options to separate them into where, include, limit, page, offset and order
    switch (key) {
      case "created":
        break;
      case "jobDescriptions":
        whereClause.include.push({
          model: JobDescription,
          attributes: ["description"],
          required: false,
        });
        if (options.skills) {
          whereClause.include[0].attributes.push("skills");
          delete options.skills;
        }
        break;
      case "keywords":
        whereClause.include.push({
          model: Keyword,
          attributes: ["keyword"],
          through: { attributes: [] },
          required: false,
        });
        break;
      default:
        if (key.approvedByGPT) {
          // Check if the is strictly equal to "yes" or "no" or "pending"
          if (["yes", "no", "pending"].includes(key.approveByGPT)) {
            whereClause.where.approveByGPT = key.approveByGPT;
          }
        }
        if (key.approvedByFormula) {
          // Check if the is strictly equal to "yes" or "no" or "pending"
          if (["yes", "no", "pending"].includes(key.approveByFormula)) {
            whereClause.where.approveByFormula = key.approveByFormula;
          }
        }
        if (key.easyApply) {
          // Check if the is strictly equal to "yes" or "no" or "pending"
          if (["yes", "no", "pending"].includes(key.easyApply)) {
            whereClause.where.easyApply = key.easyApply;
          }
        } else {
          if (key === "limit" || key === "page") {
            break;
          }
          whereClause.where[key] = options[key];
        }
    }
  }

  try {
    const jobs = await jobServices.getAllJobs(whereClause);
    if (jobs.total === 0) {
      return res.status(404).send("No jobs found");
    } else {
      // console.log("🚀 ~ getAllJobs ~ jobs:", jobs)
      const totalPages = Math.ceil(jobs.total / whereClause.limit);

      return res.status(200).json({
        total: jobs.total,
        totalPages,
        currentPage: page,
        limit: whereClause.limit,
        jobs: jobs.data,
      });
    }
  } catch (error) {
    console.log("🚀 ~ getAllJobs ~ error:", error);
  }
};

export const saveJobsToFile = async (req, res) => {
  const options = req.query;
  try {
    const jobs = await jobServices.getAllJobs(options);
    // python function to save to file
    const saveToFilePath = await saveToFile(jobs);
    console.log("🚀 ~ saveJobsToFile ~ saveToFilePath:", saveToFilePath);
    if (saveToFilePath) {
      return res.status(200).json({ message: "File saved successfully" });
    }
  } catch (error) {
    console.log("🚀 ~ getAllJobs ~ error:", error);
  }
};

export const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await jobServices.getJobById(id);
    return res.status(200).json(job);
  } catch (error) {
    console.log("🚀 ~ getJobById ~ error:", error);
  }
};

export const getJobsByCompanyName = async (req, res) => {
  const { companyName } = req.params;
  try {
    const job = await jobServices.getJobsByCompanyName(companyName);
    return res.status(200).json(job);
  } catch (error) {
    console.log("🚀 ~ getJobsByCompanyName ~ error:", error);
  }
};

export const getAllByAccepetance = async (req, res) => {
  const { formulaAcceptance, gptAcceptance } = req.query;
  if (!formulaAcceptance && !gptAcceptance) {
    return res.status(400).json({ message: "Missing query params" });
  }
  try {
    const jobs = await jobServices.getAllByAccepetance(
      formulaAcceptance,
      gptAcceptance
    );
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllByAccepetance ~ error:", error);
  }
};

export const getAllByCoverLetter = async (req, res) => {
  try {
    const jobs = await jobServices.getAllByCoverLetter();
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllByCoverLetter ~ error:", error);
  }
};

export const getAllApplied = async (req, res) => {
  try {
    const jobs = await jobServices.getAllApplied();
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllApplied ~ error:", error);
  }
};

export const getAllRejected = async (req, res) => {
  try {
    const jobs = await jobServices.getAllRejected();
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("🚀 ~ getAllApplied ~ error:", error);
  }
};

export const searchAndCreateJobs = async (req, res) => {
  // const { jobInfo, keywords } = req.body;
  const { keywords, locationId, datePosted, sort } = req.query;
  try {
    const jobs = await linkedInApi.filterJobs({
      keywords,
      locationId,
      datePosted,
      sort,
    });
    if (!jobs || jobs.length === 0) {
      console.log("🚀 ~ searchAndCreateJobs ~ jobs:", "No jobs found");
      return res.status(404).send("No jobs found");
    }
    let jobsCreated = 0;
    let jobsThatAlreadyExist = 0;
    for (const job of jobs.data) {
      const returnedJob = await jobServices.createJob(job, keywords);
      returnedJob.createdJob ? jobsCreated++ : jobsThatAlreadyExist++;
    }
    return res
      .status(201)
      .send(
        `Created ${jobsCreated} jobs out of ${jobs.filteredJobs} that were filtered out of ${jobs.total} jobs in total. ${jobsThatAlreadyExist} jobs already existed in DB.`
      );
  } catch (error) {
    console.log("🚀 ~ createJob ~ error:", error);
    return res.status(500).send("An error occurred while creating jobs.");
  }
};

export const bulkCreateJobs = async (req, res) => {
  const { jobsInfoArray, keywords } = req.body;
  try {
    const jobs = await jobServices.bulkCreateJobs(jobsInfoArray, keywords);
    return res.status(201).json(jobs);
  } catch (error) {
    console.log("🚀 ~ bulkCreateJobs ~ error:", error);
  }
};

export const updateApprovedByDate = async (req, res) => {
  let jobsUpdated = 0;
  try {
    const jobs = await jobServices.getAllJobs({
      where: {
        approvedByFormula: "yes",
        easyApply: "pending",
      },
    });
    console.log("🚀 ~ updateApprovedByDate ~ jobs:", jobs.total);
    if (jobs.total === 0) {
      return res.status(404).send("No jobs found");
    }
    for (const job of jobs.data) {
      await jobServices.updateApprovedByDate(job.id);
      jobsUpdated++;
    }
    return res.status(200).json(jobsUpdated);
  } catch (error) {
    console.log("🚀 ~ updateApprovedByDate ~ error:", error);
  }
};

export const approveByGPT = async (req, res) => {
  const whereClause = {
    where: {
      approvedByGPT: "pending",
      approvedByFormula: "pending",
      easyApply: "yes",
    },
    include: [
      {
        model: JobDescription,
        attributes: ["description", "skills"],
        required: false,
      },
    ],
    order: [["createdAt", "ASC"]],
    limit: 300,
    offset: 0,
  };
  const jobs = await jobServices.getAllJobs(whereClause);
  console.log("🚀 ~ approveByGPT ~ jobs:", jobs.total);
  if (jobs.length === 0) {
    return res.status(404).send("No jobs found");
  }
  try {
    const jobsApproved = await jobServices.approveByGPT(jobs.data);
    return res.status(200).json(jobsApproved);
  } catch (error) {
    console.log("🚀 ~ updateJob ~ error:", error);
  }
};

export const approveByFormula = async (req, res) => {
  const whereClause = {
    where: {
      approvedByFormula: "pending",
      // id: "4138534746"
    },
    include: [
      {
        model: JobDescription,
        attributes: ["description", "skills"],
        required: false,
      },
    ],
    order: [["createdAt", "ASC"]],
    limit: 500,
    offset: 0,
  };
  const jobs = await jobServices.getAllJobs(whereClause);
  if (jobs.length === 0) {
    return res.status(404).send("No jobs found");
  }
  try {
    const jobsApproved = await jobServices.approveByFormula(jobs.data);
    return res.status(200).json(jobsApproved);
  } catch (error) {
    console.log("🚀 ~ updateJob ~ error:", error);
  }
};

export const filterByJobTitle = async (req, res) => {
  const jobs = await jobServices.getAllJobs({
    approvedByFormula: "pending",
  });
  // console.log("🚀 ~ filterByJobTitle ~ jobs:", jobs);
  if (jobs.length === 0) {
    return res.status(404).send("No jobs found");
  }
  // return res.status(200).json(jobs);
  try {
    const filteredJobs = await jobServices.filterByJobTitle(jobs.data);
    return res.status(200).json(filteredJobs);
  } catch (error) {
    console.log("🚀 ~ updateJob ~ error:", error);
  }
};

export const searchAndCreateWithAllKeywords = async (req, res) => {
  console.log("🚀 ~ searchAndCreateWithAllKeywords ~ req.query:", req.query);
  const { locationId, datePosted, sort } = req.query;
  try {
    // Get all keywords
    const keywords = await keywordServices.getAllKeywords();
    console.log(
      "🚀 ~ searchAndCreateWithAllKeywords ~ keywords:",
      keywords.length
    );

    // If no keywords found, return 404
    if (!keywords || keywords.length === 0) {
      console.log("🚀 ~ searchAndCreateJobs ~ jobs:", "No keywords found");
      return res.status(404).send("No keywords found");
    }

    // Creating accumulative variables for jobs created and jobs that already exist
    let jobsCreated = 0;
    let jobsThatAlreadyExist = 0;
    let searchedJobs = 0;

    // Loop through each keyword
    for (const keyword of keywords) {
      console.log(
        "🚀 ~ searchAndCreateWithAllKeywords ~ keyword:",
        keyword.keyword
      );

      // Searching and filtering jobs according to the specific keyword on the loop
      const jobs = await linkedInApi.filterJobs({
        keywords: keyword.keyword,
        locationId,
        datePosted,
        sort,
      });
      // If no jobs found, continue to the next keyword
      if (!jobs || jobs.length === 0) {
        console.log("🚀 ~ searchAndCreateJobs ~ jobs:", "No jobs found");
        continue;
      }
      if (jobs.total) searchedJobs += jobs.total;

      // Loop through each job and create it
      for (const job of jobs.data) {
        const returnedJob = await jobServices.createJob(job, keyword.keyword);
        returnedJob.createdJob ? jobsCreated++ : jobsThatAlreadyExist++;
      }
    }

    return res
      .status(201)
      .send(
        `Created ${jobsCreated} jobs out of ${jobsCreated + jobsThatAlreadyExist} that were filtered out of ${searchedJobs} jobs in total. ${jobsThatAlreadyExist} jobs already existed in DB.`
      );
  } catch (error) {
    console.log("🚀 ~ searchAndCreateWithAllKeywords ~ error:", error);
    return res.status(500).send("An error occurred while creating jobs.");
  }
};
