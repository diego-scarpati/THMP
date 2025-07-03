import JobKeyword from "../models/JobKeyword.js";
import { Transaction } from "sequelize";

export const createJobKeyword = async (
  jobId: string,
  keywordId: number,
  transaction?: Transaction
) => {
  try {
    const jobKeyword = await JobKeyword.create(
      { jobId, keywordId },
      { transaction }
    );
    return jobKeyword;
  } catch (error) {
    console.error("Error creating JobKeyword:", error);
    throw error;
  }
};
