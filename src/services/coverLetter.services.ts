import { CoverLetter } from "../models/index";
import { CoverLetterAttributes } from "../utils/types";

export const getAllCoverLetters = async (): Promise<CoverLetterAttributes[]> => {
  try {
    const coverLetters = await CoverLetter.findAll();
    return coverLetters;
  } catch (error) {
    console.log("🚀 ~ getAllCoverLetters ~ error:", error);
  }
};

export const getCoverLetterById = async (
  id: string
): Promise<CoverLetterAttributes | null> => {
  try {
    const coverLetter = await CoverLetter.findByPk(id);
    return coverLetter;
  } catch (error) {
    console.log("🚀 ~ getCoverLetterById ~ error:", error);
  }
};

export const createCoverLetter = async (
  coverLetter: CoverLetterAttributes
): Promise<CoverLetterAttributes | null> => {
  try {
    const newCoverLetter = await CoverLetter.create(coverLetter);
    return newCoverLetter;
  } catch (error) {
    console.log("🚀 ~ createCoverLetter ~ error:", error);
  }
};
