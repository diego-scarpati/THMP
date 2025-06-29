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

export interface LinkedInJob {
  id: string;
  title: string;
  url: string;
  referenceId: string;
  posterId: string;
  company: {
    id: number | null | undefined;
    name: string | null | undefined;
    logo: string | null | undefined;
    url: string | null | undefined;
    staffCountRange: Record<string, unknown> | null | undefined;
    headquarter: Record<string, unknown> | null | undefined;
  };
  location: string;
  postAt: string;
  postedTimestamp: number;
}

export interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
export interface IUserAttributes extends IUser {
  id: number;
}
