import * as keywordService from "../services/keyword.services.js";
import { KeywordAttributes } from "../utils/types.js";

export const getAllKeywords = async (req, res) => {
  try {
    const keywords = await keywordService.getAllKeywords();
    return res.status(200).json(keywords);
  } catch (error) {
    console.log("🚀 ~ getAllKeywords ~ error:", error);
  }
};

export const getKeywordById = async (req, res) => {
  const { id } = req.params;
  try {
    const keyword = await keywordService.getKeywordById(id);
    return res.status(200).send(keyword);
  } catch (error) {
    console.log("🚀 ~ getKeywordById ~ error:", error);
  }
};

export const createKeyword = async (req, res) => {
  const { keyword } = req.body as { keyword: KeywordAttributes };
  try {
    const newKeyword = await keywordService.createKeyword(keyword);
    return res.status(201).json(newKeyword);
  } catch (error) {
    console.log("🚀 ~ createKeyword ~ error:", error);
  }
};
