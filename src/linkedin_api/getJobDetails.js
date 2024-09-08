// const dotenv = require("dotenv");
// const path = require("path");
import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { LINKEDIN_API_KEY } = process.env;

export const getJobDetails = async (jobId) => {
  const url = `https://linkedin-api8.p.rapidapi.com/get-job-details?id=${jobId}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": LINKEDIN_API_KEY,
      "x-rapidapi-host": "linkedin-api8.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    if (response.status !== 200) {
      console.error("Error: ", result);
      return;
    }
    console.log("type of result: ", typeof result);

    // Transform the string into an object
    const resultObj = JSON.parse(result);
    console.log("🚀 ~ getJobDetails ~ resultObj:", resultObj);

    return resultObj;
  } catch (error) {
    console.error(error);
  }
};