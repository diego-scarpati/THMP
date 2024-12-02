// const { getAllJobs } = require("./getAllJobs");
// const { getJobDetails } = require("./getJobDetails");
import { getAllJobs } from "./getAllJobs.cjs";
import { getJobDetails } from "./getJobDetails.cjs";
// import { acceptByFormula } from "../utils/pythonFunctions.cjs";

// The function will have to run as many times as the number of jobs "total" divided by 25. To do this,
export const fetchAllJobs = async (options) => {
  let accumulatedData = []; // Store all data here
  let page = 1; // Start from page 1
  const pageSize = 50; // Define the page size (maximum length of data array)
  let stop = 0;
  let total = 0; // Will hold the total number of items returned
  try {
    do {
      const result = await getAllJobs({
        ...options,
        start: (page - 1) * pageSize,
      });
      if (!result.success) {
        throw new Error(result.message); // Exit if the API call is unsuccessful
      }

      // Push new data to the accumulated data array
      if (result.data) {
        accumulatedData = [...accumulatedData, ...result.data];
      }

      // Set the total on the first API call
      if (page === 1) {
        total = result.total;
        stop = Math.floor(total / pageSize) + 1;
      }

      // Increment the page for the next request
      page++;
    } while (page <= stop);
    console.log(
      "🚀 ~ fetchAllJobs ~ accumulatedData.length:",
      accumulatedData.length
    );
    // Filtering accumulatedData to remove duplicates by id
    const seen = new Set();
    accumulatedData = accumulatedData.filter((job) => {
      const duplicate = seen.has(job.id);
      seen.add(job.id);
      return !duplicate;
    });
    console.log(
      "🚀 ~ accumulatedData=accumulatedData.filter ~ accumulatedData:",
      accumulatedData.length
    );
    return { accumulatedData, total };
  } catch (error) {
    console.log("🚀 ~ fetchAllJobs ~ error:", error);
    return null;
  }
};

export const filterJobs = async (options) => {
  const jobs = await fetchAllJobs(options);
  if (jobs.total === 0) {
    console.log("🚀 ~ filterJobs ~ jobs:", "No jobs found");
    return null;
  }
  // Filter out all jobs that have senior OR lead in the title and return the ones that don't
  const filteredJobs = jobs.accumulatedData.filter((job) => {
    const title = job.title.toLowerCase().split(" ");
    return (
      !title.includes("senior") &&
      !title.includes("lead") &&
      !title.includes("principal") &&
      !title.includes("director") &&
      !title.includes("manager") &&
      !title.includes("intern") &&
      !title.includes("internship") &&
      !title.includes("lavarel") &&
      !title.includes("architect") &&
      !title.includes("php") &&
      !title.includes("power apps") &&
      !title.includes("golang") &&
      !title.includes(".net") &&
      !title.includes("dotnet") &&
      !title.includes("rust") &&
      !title.includes("salesforce")
    );
  });
  console.log("🚀 ~ filteredJobs ~ filteredJobs:", filteredJobs.length);
  return { data: filteredJobs, total: filteredJobs.length };
};

// filterJobs(options);

export const fetchJobDetails = async (jobId) => {
  let id = jobId;
  // console.log("🚀 ~ fetchJobDetails ~ id:", id)
  if (typeof jobId !== "number") {
    // console.log("🚀 ~ fetchJobDetails ~ jobId:", jobId);
    id = parseInt(jobId);
    // console.log("🚀 ~ fetchJobDetails ~ typoeof jobId:", typeof jobId);
  }
  const result = await getJobDetails(jobId);
  // console.log("🚀 ~ fetchJobDetails ~ result:", result);
  if (!result.success) {
    console.log("🚀 ~ fetchJobDetails ~ result.message:", result.message);
    return null;
  }
  return result.data;
};

// fetchJobDetails(3994478124);
