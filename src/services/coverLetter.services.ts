import { CoverLetter } from "../models/index";

export const getAllCoverLetters = async (): Promise<CoverLetter[] | undefined> => {
  try {
    const coverLetters = await CoverLetter.findAll();
    return coverLetters;
  } catch (error) {
    console.log("🚀 ~ getAllCoverLetters ~ error:", error);
  }
};

export const getCoverLetterById = async (id: string): Promise<CoverLetter | undefined | null> => {
  try {
    const coverLetter = await CoverLetter.findByPk(id);
    return coverLetter;
  } catch (error) {
    console.log("🚀 ~ getCoverLetterById ~ error:", error);
  }
};

export const createCoverLetter = async (
  coverLetterData: any
): Promise<CoverLetter | undefined | null> => {
  try {
    const newCoverLetter = await CoverLetter.create(coverLetterData);
    return newCoverLetter;
  } catch (error) {
    console.log("🚀 ~ createCoverLetter ~ error:", error);
  }
};
