import { CoverLetter } from "../models/index";

export const getAllCoverLetters = async () => {
  try {
    const coverLetters = await CoverLetter.findAll();
    return coverLetters;
  } catch (error) {
    console.log("🚀 ~ getAllCoverLetters ~ error:", error);
  }
};

export const getCoverLetterById = async (id) => {
  try {
    const coverLetter = await CoverLetter.findByPk(id);
    return coverLetter;
  } catch (error) {
    console.log("🚀 ~ getCoverLetterById ~ error:", error);
  }
};

export const createCoverLetter = async (coverLetter) => {
  try {
    const newCoverLetter = await CoverLetter.create(coverLetter);
    return newCoverLetter;
  } catch (error) {
    console.log("🚀 ~ createCoverLetter ~ error:", error);
  }
};
