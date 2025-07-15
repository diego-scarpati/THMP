import { Transaction } from "sequelize";
import { Keyword } from "../models/index.js";

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

export const createKeyword = async (keyword: string): Promise<undefined | Keyword | null> => {
  try {
    const newKeyword = await Keyword.create({ keyword });
    return newKeyword;
  } catch (error) {
    console.log("🚀 ~ createKeyword ~ error:", error);
  }
};

// export const findOrCreateKeyword = async (keyword: string): Promise<undefined | Keyword | null> => {
//   try {
//     const [foundKeyword, created] = await Keyword.findOrCreate({
//       where: { keyword },
//       defaults: { keyword },
//     });
//     return foundKeyword;
//   } catch (error) {
//     console.log("🚀 ~ findOrCreateKeyword ~ error:", error);
//   }
// }
export const findOrCreateKeyword = async (
  keyword: string,
  transaction?: Transaction
): Promise<[Keyword, boolean]> => {
  return Keyword.findOrCreate({
    where: { keyword },
    defaults: { keyword },
    transaction,
  });
};
