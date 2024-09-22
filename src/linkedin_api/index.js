// const { getAllJobs } = require("./getAllJobs");
// const { getJobDetails } = require("./getJobDetails");
import { getAllJobs } from "./getAllJobs.cjs";
import { getJobDetails } from "./getJobDetails.cjs";

// The function will have to run as many times as the number of jobs "total" divided by 25. To do this,
export const fetchAllJobs = async (options) => {
  let accumulatedData = []; // Store all data here
  let page = 1; // Start from page 1
  const pageSize = 25; // Define the page size (maximum length of data array)
  let stop = 0;
  let total = 0; // Will hold the total number of items returned
  let updatedTotal = 1000;
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
      
      console.log("🚀 ~ fetchAllJobs ~ result.data.length:", result.data.length)
      console.log("🚀 ~ fetchAllJobs ~ typeof result.data:", typeof result.data)
      accumulatedData = [...accumulatedData, ...result.data];
      console.log("🚀 ~ fetchAllJobs ~ accumulatedData:", accumulatedData.length)
      
      // Set the total on the first API call
      if (page === 1) {
        total = result.total;
        console.log("🚀 ~ fetchAllJobs ~ total:", total)
        stop = Math.floor(total / pageSize) + 1;
      }
      updatedTotal = result.total;
      console.log("🚀 ~ fetchAllJobs ~ updatedTotal:", updatedTotal)

      // Increment the page for the next request
      page++;
    } while (page <= stop || updatedTotal <= accumulatedData.length);
    // Filtering accumulatedData to remove duplicates by id
    const seen = new Set();
    accumulatedData = accumulatedData.filter((job) => {
      const duplicate = seen.has(job.id);
      seen.add(job.id);
      return !duplicate;
    });
    console.log("🚀 ~ accumulatedData=accumulatedData.filter ~ accumulatedData:", accumulatedData.length)
    return { data: accumulatedData, total };
  } catch (error) {
    console.log("🚀 ~ fetchAllJobs ~ error:", error);
    return null;
  }
};

export const filterJobs = async (options) => {
  const jobs = await fetchAllJobs(options);
  // Filter out all jobs that have senior OR lead in the title and return the ones that don't
  const filteredJobs = jobs.data.filter((job) => {
    const title = job.title.toLowerCase();
    return (
      !title.includes("senior") &&
      !title.includes("lead") &&
      !title.includes("salesforce")
    );
  });
  console.log("🚀 ~ filteredJobs ~ filteredJobs:", filteredJobs.length);
  return {data: filteredJobs, total: filteredJobs.length};
};

// filterJobs(options);

export const fetchJobDetails = async (jobId) => {
  const result = await getJobDetails(jobId);
  console.log("🚀 ~ fetchJobDetails ~ result:", result);
  return result;
};

// fetchJobDetails(3994478124);
