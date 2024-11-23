// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { LINKEDIN_API_KEY } = process.env;

/**
 *
 * @param {* string keywords related to the position } keywords
 * @param {* number id of the location you're looking for a job} locationId
 * @param {* string it could be one of these; anyTime, pastMonth, pastWeek, past24Hours} datePosted
 * @param {* string mostRelevant or mostRecent} sort
 * @param {* string it could be one of these: onSite, remote, hybrid} onsiteRemote
 * @param {* string (optional) it could be one of these: 0, 25, 50, 75, 100, etc. The maximum number of start is 975} start
 * @param {* string (optional) it could be one of these: internship, associate, director, entryLevel, midSeniorLevel.} experienceLevel
 */
const getAllJobs = async (getAllJobsParamObject) => {
  const { keywords, locationId, datePosted, sort, start, experienceLevel } =
    getAllJobsParamObject;
  const parsedKeywords = keywords.split(" ").join("%20");
  const params = {
    keywords: parsedKeywords,
    locationId: locationId ? locationId : 104769905, // Sydney, Australia
    datePosted: datePosted ? datePosted : "anyTime",
    sort: sort ? sort : "mostRecent",
    start: start ? start : 0,
    experienceLevel: experienceLevel ? experienceLevel : undefined,
  };

  // let url = "https://linkedin-api8.p.rapidapi.com/search-jobs";
  let url = "https://rapid-linkedin-jobs-api.p.rapidapi.com/search-jobs-v2";

  const urlWithParams = () => {
    let urlWithParams = url;
    Object.keys(params).map((key, index) => {
      if (index === 0) {
        urlWithParams += `?${key}=${params[key]}`;
      } else {
        urlWithParams += `&${key}=${params[key]}`;
      }
    });
    return urlWithParams;
  };
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": LINKEDIN_API_KEY,
      "x-rapidapi-host": "linkedin-api8.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(urlWithParams(), options);
    const result = await response.text();
    if (response.status !== 200) {
      console.error("Error: ", result);
      return;
    }
    // console.log("type of result: ", typeof result);

    // Transform the string into an object
    const resultObj = JSON.parse(result);

    // console.log("🚀 ~ getAllJobs ~ resultObj:", resultObj);
    // console.log(
    //   "🚀 ~ getAllJobs ~ resultObj.data.length:",
    //   resultObj.data.length
    // );

    return resultObj;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllJobs };
