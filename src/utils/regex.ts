export const shouldHaveInTitle: RegExp = /\b(developer|dev|software|engineer|frontend|front end|front-end|backend|back end|back-end|fullstack|full stack|full-stack|react|reactjs|javascript|typescript|node|nodejs)\b/i;

export const shouldExcludeIftitle: RegExp = /\b(senior|sr.|lead|principal|director|manager|intern|internship|quantitative|android|sharepoint|kotlin|drupal|365|d365|azure|lavarel|architect|php|power|powerapps|powerapp|spring|golang|dotnet|rust|salesforce|java|appian|csharp|c#)\b/i;

export const excludeDotNet: RegExp = new RegExp("\\.net", "i");
// export const excludeCSharp = new RegExp("\\c#", "i");
export const excludeCs: RegExp = /\b(c\\+\\+|c\#)\b/i;
// export const excludeCs = /\bc\#\b|\bc\+\+\b/i;
export const excludeCSharp: RegExp = new RegExp("c\\#", "i");
export const excludeCPlusPlus: RegExp = new RegExp("c\\+\\+", "i");

export const nonLatinPattern: RegExp = /[^\u0000-\u007F]/;
