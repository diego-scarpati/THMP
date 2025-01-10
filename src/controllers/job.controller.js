import * as jobServices from "../services/job.services.js";
import * as keywordServices from "../services/keyword.services.js";
import * as linkedInApi from "../linkedin_api/index.js";
import { saveToFile } from "../utils/pythonFunctions.cjs";

export const getAllJobs = async (req, res) => {
  const options = { ...req.query };
  console.log("🚀 ~ getAllJobs ~ options:", options);

  const whereClause = {};

  const validValues = ["yes", "no", "pending"];

  // Loop through each query parameter
  for (const [key, value] of Object.entries(options)) {
    // Check if the parameter is approvedByFormula and validate it
    if (key === "approvedByFormula" || key === "approvedByGPT") {
      if (validValues.includes(value)) {
        whereClause[key] = value; // Only add if valid
      }
    } else if (key === "keywords" || key === "jobDescriptions") {
      console.log("🚀 ~ getAllJobs ~ value:", value);
      value === "true" ? (whereClause[key] = true) : (whereClause[key] = false);
    } else if (value !== undefined) {
      // For other parameters, add them as-is if they are defined
      whereClause[key] = value;
    }
  }
  console.log("🚀 ~ getAllJobs ~ whereClause:", whereClause);

  try {
    const jobs = await jobServices.getAllJobs(whereClause);
    if (jobs.length === 0) {
      return res.status(404).send("No jobs found");
    } else {
      return res.status(200).json(jobs);
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

// export const updateJob = async (req, res) => {
//   const { id } = req.params;
//   const { jobInfo } = req.body;
//   try {
//     const job = await jobServices.updateJob(id, jobInfo);
//     return res.status(200).json(job);
//   } catch (error) {
//     console.log("🚀 ~ updateJob ~ error:", error);
//   }
// };

export const approveByGPT = async (req, res) => {
  const jobs = await jobServices.getAllJobs({
    approvedByGPT: "pending",
    easyApply: "yes",
    approvedByFormula: "yes",
    jobDescriptions: true,
    skills: true,
  });
  if (jobs.length === 0) {
    return res.status(404).send("No jobs found");
  }
  // return res.status(200).json(jobs);
  try {
    const jobsApproved = await jobServices.approveByGPT(jobs);
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
    const filteredJobs = await jobServices.filterByJobTitle(jobs);
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
