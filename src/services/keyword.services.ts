import { Keyword } from "../models/index";
import { KeywordAttributes } from "../utils/types";

export const getAllKeywords = async (): Promise<KeywordAttributes[]> => {
  try {
    const keywords = await Keyword.findAll();
    return keywords;
  } catch (error) {
    console.log("🚀 ~ getAllKeywords ~ error:", error);
  }
};

export const getKeywordById = async (
  id: number
): Promise<KeywordAttributes | null> => {
  try {
    const keyword = await Keyword.findByPk(id);
    return keyword;
  } catch (error) {
    console.log("🚀 ~ getKeywordById ~ error:", error);
  }
};

export const createKeyword = async (
  keyword: KeywordAttributes
): Promise<KeywordAttributes | null> => {
  try {
    const newKeyword = await Keyword.create(keyword);
    return newKeyword;
  } catch (error) {
    console.log("🚀 ~ createKeyword ~ error:", error);
  }
};
