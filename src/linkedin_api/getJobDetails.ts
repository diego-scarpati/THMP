import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface Env {
  LINKEDIN_API_KEY?: string;
}

const { LINKEDIN_API_KEY } = process.env as Env;

export const getJobDetails = async (jobId: string): Promise<any> => {
  const url = `https://linkedin-api8.p.rapidapi.com/get-job-details?id=${jobId}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": LINKEDIN_API_KEY as string,
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
    // console.log("type of result: ", typeof result);

    // Transform the string into an object
    const resultObj = JSON.parse(result);
    // console.log("🚀 ~ getJobDetails ~ resultObj:", resultObj);

    return resultObj;
  } catch (error) {
    console.error(error);
  }
};

export default { getJobDetails };
