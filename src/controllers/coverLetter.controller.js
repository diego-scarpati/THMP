import * as coverLetterService from "../services/coverLetter.services.js";

export const getAllCoverLetters = async (req, res) => {
  try {
    const coverLetters = await coverLetterService.getAllCoverLetters();
    return res.status(200).json(coverLetters);
  } catch (error) {
    console.log("🚀 ~ getAllCoverLetters ~ error:", error);
  }
};

export const getCoverLetterById = async (req, res) => {
  const { id } = req.params;
  try {
    const coverLetter = await coverLetterService.getCoverLetterById(id);
    return res.status(200).json(coverLetter);
  } catch (error) {
    console.log("🚀 ~ getCoverLetterById ~ error:", error);
  }
};

export const createCoverLetter = async (req, res) => {
  const { coverLetter } = req.body;
  try {
    const newCoverLetter = await coverLetterService.createCoverLetter(
      coverLetter
    );
    return res.status(201).json(newCoverLetter);
  } catch (error) {
    console.log("🚀 ~ createCoverLetter ~ error:", error);
  }
};
