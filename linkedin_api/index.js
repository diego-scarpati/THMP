const { getAllJobs } = require("./getAllJobs");
const { getJobDetails } = require("./getJobDetails");

let keywords = "react native";
let start = 0;

const options = {
  keywords,
  start,
};

const fetchAllJobs = async (options) => {
  console.log("🚀 ~ fetchAllJobs ~ options:", options);
  const result = await getAllJobs(options);
  return result;
};

const filterJobs = async (options) => {
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
  console.log("🚀 ~ filteredJobs ~ filteredJobs:", filteredJobs);
  return filteredJobs;
};

// filterJobs(options);

const fetchJobDetails = async (jobId) => {
  const result = await getJobDetails(jobId);
  console.log("🚀 ~ fetchJobDetails ~ result:", result)
  return result;
}

fetchJobDetails(3994478124);
