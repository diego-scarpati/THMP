import { Keyword } from "../models/index";

export const getAllKeywords = async (): Promise<undefined | Keyword[]> => {
  try {
    const keywords = await Keyword.findAll();
    return keywords;
  } catch (error) {
    console.log("🚀 ~ getAllKeywords ~ error:", error);
  }
};

export const getKeywordById = async (id: number): Promise<undefined | Keyword | null> => {
  try {
    const keyword = await Keyword.findByPk(id);
    return keyword;
  } catch (error) {
    console.log("🚀 ~ getKeywordById ~ error:", error);
  }
};

export const createKeyword = async (keywordData: any): Promise<undefined | Keyword | null> => {
  try {
    const newKeyword = await Keyword.create(keywordData);
    return newKeyword;
  } catch (error) {
    console.log("🚀 ~ createKeyword ~ error:", error);
  }
};
