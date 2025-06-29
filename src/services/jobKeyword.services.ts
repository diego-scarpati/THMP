import JobKeyword from "../models/JobKeyword.js";

export const createJobKeyword = async (jobId: string, keywordId: number) => {
  try {
    const jobKeyword = await JobKeyword.create({ jobId, keywordId });
    return jobKeyword;
  } catch (error) {
    console.error("Error creating JobKeyword:", error);
    throw error;
  }
};
