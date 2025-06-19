import { Keyword } from "../models/index";

export const getAllKeywords = async () => {
  try {
    const keywords = await Keyword.findAll();
    return keywords;
  } catch (error) {
    console.log("🚀 ~ getAllKeywords ~ error:", error);
  }
};

export const getKeywordById = async (id) => {
  try {
    const keyword = await Keyword.findByPk(id);
    return keyword;
  } catch (error) {
    console.log("🚀 ~ getKeywordById ~ error:", error);
  }
};

export const createKeyword = async (keyword) => {
  try {
    const newKeyword = await Keyword.create(keyword);
    return newKeyword;
  } catch (error) {
    console.log("🚀 ~ createKeyword ~ error:", error);
  }
};
