export const shouldHaveInTitle =
  /\b(developer|dev|software|engineer|frontend|front end|front-end|backend|back end|back-end|fullstack|full stack|full-stack|react|reactjs|javascript|typescript|node|nodejs)\b/i;

export const shouldExcludeIftitle =
  /\b(senior|lead|principal|director|manager|intern|internship|lavarel|architect|php|power|powerapps|powerapp|spring|swift|golang|dotnet|rust|salesforce|java|appian|csharp)\b/i;

export const excludeDotNet = new RegExp("\\.net", "i");

export const nonLatinPattern = /[^\u0000-\u007F]/;
