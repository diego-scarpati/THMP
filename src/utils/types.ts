export interface JobAttributes {
  id: string;
  title: string;
  url: string;
  referenceId?: string;
  posterId?: string;
  company: string;
  location?: string;
  type?: string;
  postDate?: string;
  benefits?: string;
  approvedByFormula?: "yes" | "no" | "pending";
  approvedByGPT?: "yes" | "no" | "pending";
  easyApply?: "yes" | "no" | "pending";
}

export interface JobDescriptionAttributes {
  id: string;
  state: string;
  description: string;
  companyApplyUrl?: string;
  easyApplyUrl?: string;
  workRemoteAllowed?: boolean;
  workPlace?: string;
  formattedExperienceLevel?: string;
  skills?: string;
}

export interface CoverLetterAttributes {
  id: string;
  keyword: string;
}

export interface KeywordAttributes {
  id: number;
  keyword: string;
}
