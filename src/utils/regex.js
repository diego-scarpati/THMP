export const shouldHaveInTitle =
  /\b(developer|dev|software|engineer|frontend|front end|front-end|backend|back end|back-end|fullstack|full stack|full-stack|react|reactjs|javascript|typescript|node|nodejs)\b/i;

export const shouldExcludeIftitle =
  /\b(senior|sr.|lead|chief|principal|director|manager|intern|internship|devops|quality|qa|quantitative|android|sharepoint|ruby|rails|unity|kotlin|drupal|365|d365|azure|lavarel|architect|php|power|powerapps|powerapp|spring|golang|dotnet|rust|salesforce|java|appian|csharp|c#)\b/i;

export const excludeDotNet = new RegExp("\\.net", "i");
// export const excludeCSharp = new RegExp("\\c#", "i");
export const excludeCs = new RegExp(/\b(c\\+\\+|c\#)\b/i);
// export const excludeCs = /\bc\#\b|\bc\+\+\b/i;
export const excludeCSharp = new RegExp("c\\#", "i");
export const excludeCPlusPlus = new RegExp("c\\+\\+", "i");

export const nonLatinPattern = /[^\u0000-\u007F]/;
