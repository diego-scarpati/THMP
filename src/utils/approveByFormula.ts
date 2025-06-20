const candidateSkillsJson = require("../assets/diego-scarpati-skills.json") as {
  skills: string[];
};

const rejectingSkills = [
  ".Net",
  "Appian",
  "AppSec",
  "Architect",
  "C",
  "C#",
  "C++",
  "Connex",
  "CSharp",
  "dotnet",
  "Director",
  "Go",
  "Golang",
  "Goolang",
  "Intern",
  "Internship",
  "Java",
  "Lavarel",
  "Lead",
  "Manager",
  "Principal",
  "Rust",
  "Senior",
  "PHP",
  "Power",
  "Power App",
  "Power Apps",
  "Saledforce",
  "Spring",
  "Spring Boot",
  "Swift",
  "Synfony",
];

const candidateSkills = candidateSkillsJson.skills;

/**
 * Checks if a candidate's experience meets the job description's requirement.
 *
 * The function looks for various phrasings that indicate an experience requirement:
 *   1. "Exactly X years" → candidate must have exactly that number of years.
 *   2. "Between X and Y years" (or "Between X-Y years") → candidate's experience must be within that range.
 *   3. "X-Y years" (without "between") → another way to specify a range.
 *   4. Minimum requirement expressions:
 *        - "Minimum of X years"
 *        - "No less than X years"
 *        - "At least X years"
 *        - Shorthand notation "X+ years"
 *   5. "More than X years" or "Over X years" → candidate must have strictly more than X years.
 *   6. Maximum requirement expressions:
 *        - "Maximum of X years"
 *        - "No more than X years"
 *        - "Not exceeding X years"
 *        - "Up to X years"
 *   7. Direct statements such as "Experience required: X years" or "X years experience required"
 *      (this is treated as a minimum requirement).
 *
 * If no experience-related phrase is detected, the function returns true (no explicit requirement).
 *
 * @param {string} jobDescription - The job description text.
 * @param {number} candidateExperience - The candidate's experience in years.
 * @returns {boolean} - True if the candidate meets the requirement (or no requirement is specified), false otherwise.
 */
function checkExperience(jobDescription: string, candidateExperience: number): boolean {
  // Normalize the description to lower-case for case-insensitive matching.
  const description = jobDescription.toLowerCase();
  let match;

  // 1. "Exactly X years" → candidate must have exactly that number of years.
  match = description.match(/\bexactly\s+(\d+)\s*(?:years?|yrs?)\b/);
  if (match) {
    const requiredExp = parseInt(match[1], 10);
    return candidateExperience === requiredExp;
  }

  // 2. "Between X and Y years" or "Between X-Y years"
  match = description.match(/\bbetween\s+(\d+)\s*(?:and|-)\s*(\d+)\s*(?:years?|yrs?)\b/);
  if (match) {
    const minExp = parseInt(match[1], 10);
    const maxExp = parseInt(match[2], 10);
    return candidateExperience >= minExp && candidateExperience <= maxExp;
  }

  // 3. Range expressed as "X-Y years" (without the word "between")
  match = description.match(/\b(\d+)\s*[-–]\s*(\d+)\s*(?:years?|yrs?)\b/);
  if (match) {
    const minExp = parseInt(match[1], 10);
    const maxExp = parseInt(match[2], 10);
    return candidateExperience >= minExp && candidateExperience <= maxExp;
  }

  // 4. Minimum requirement expressions:
  // "Minimum of X years" or "No less than X years"
  match = description.match(
    /\b(?:minimum\s+of|no\s+less\s+than)\s+(\d+)\s*(?:\+?\s*(?:years?|yrs?))\b/
  );
  if (match) {
    const minExp = parseInt(match[1], 10);
    return candidateExperience >= minExp;
  }

  // "At least X years"
  match = description.match(/\bat\s+least\s+(\d+)\s*(?:years?|yrs?)\b/);
  if (match) {
    const minExp = parseInt(match[1], 10);
    return candidateExperience >= minExp;
  }

  // Shorthand notation "X+ years"
  match = description.match(/\b(\d+)\s*\+\s*(?:years?|yrs?)\b/);
  if (match) {
    const minExp = parseInt(match[1], 10);
    return candidateExperience >= minExp;
  }

  // "X+ experience" or "X+ years of experience"
  match = description.match(/\b(\d+)\s*\+\s*(?:years?|yrs?)?\s*(?:of\s+)?experience\b/);
  if (match) {
    const minExp = parseInt(match[1], 10);
    return candidateExperience >= minExp;
  }

  // 5. "More than X years" or "Over X years" → candidate must have strictly more than X years.
  match = description.match(/\b(?:more\s+than|over)\s+(\d+)\s*(?:years?|yrs?)\b/);
  if (match) {
    const requiredExp = parseInt(match[1], 10);
    return candidateExperience > requiredExp;
  }

  // 6. Maximum requirement expressions:
  // "Maximum of X years", "No more than X years", or "Not exceeding X years"
  match = description.match(
    /\b(?:maximum\s+of|no\s+more\s+than|not\s+exceeding)\s+(\d+)\s*(?:years?|yrs?)\b/
  );
  if (match) {
    const maxExp = parseInt(match[1], 10);
    return candidateExperience <= maxExp;
  }

  // "Up to X years"
  match = description.match(/\bup\s+to\s+(\d+)\s*(?:years?|yrs?)\b/);
  if (match) {
    const maxExp = parseInt(match[1], 10);
    return candidateExperience <= maxExp;
  }

  // 7. Direct statement such as "Experience required: X years" or "X years experience required"
  // We add word boundaries so that we only capture cases where a standalone number is given.
  // (Optionally, you could add a negative lookahead to avoid cases ending with "plus".)
  match = description.match(
    /\bexperience\b\s*(?:required[:\-]?\s*)?(\d+)\s*(?:\+?\s*(?:years?|yrs?))\b/
  );
  if (match) {
    const minExp = parseInt(match[1], 10);
    return candidateExperience >= minExp;
  }

  // "X years of experience" or "X years experience"
  match = description.match(/\b(\d+)\s*(?:years?|yrs?)\s+(?:of\s+)?experience\b/);
  if (match) {
    const minExp = parseInt(match[1], 10);
    return candidateExperience >= minExp;
  }

  // If no experience-related phrases are found, assume no specific requirement.
  return true;
}

/**
 * Checks if a candidate meets the job skills criteria.
 *
 * @param {string[]} jobSkills - The skills required for the job.
 * @returns {boolean} - True if the candidate meets the criteria, otherwise false.
 */
function checkSkills(jobSkills: string): boolean {
  console.log("🚀 ~ checkSkills ~ jobSkills:", jobSkills);
  // If jobSkills is null, undefined, or an empty array, immediately return false.
  if (!jobSkills || jobSkills.split(" ,").length === 0) {
    return true;
  }

  const jobSkillsArray = jobSkills.split(", ");

  // When the job requires more than 5 skills:
  if (jobSkillsArray.length > 5) {
    // Count how many required skills are present in candidateSkills.
    const matchedSkills = jobSkillsArray.filter((skill) => candidateSkills.includes(skill));
    // Candidate must have more than 50% of the required skills.
    console.log(
      "🚀 ~ checkSkills ~ matchedSkills.length > jobSkillsArray.length / 2:",
      matchedSkills.length > jobSkillsArray.length / 2
    );
    return matchedSkills.length > jobSkillsArray.length / 2;
  } else {
    // When the job requires 5 or fewer skills:
    // Count how many required skills are present in the candidate's "don't want" list.
    const undesiredMatches = jobSkillsArray.filter((skill) => rejectingSkills.includes(skill));
    // The overlap must be less than 30% of the required skills.
    // (For example, for 5 required skills, 30% of 5 is 1.5, so only 0 or 1 match is acceptable.)
    console.log(
      "🚀 ~ checkSkills ~ undesiredMatches.length < jobSkillsArray.length * 0.3:",
      undesiredMatches.length < jobSkillsArray.length * 0.3
    );
    return undesiredMatches.length < jobSkillsArray.length * 0.3;
  }
}

interface JobData {
  description?: string;
  skills?: string;
}

const shouldAcceptJob = (jobData: JobData, candidateYearsExperience: number): boolean => {
  // Extract the job description
  const description = jobData.description || "";

  if (checkExperience(description, candidateYearsExperience) === false) {
    console.log(
      "🚀 ~ checkExperience(description, candidateYearsExperience) === false:",
      checkExperience(description, candidateYearsExperience) === false
    );
    return false;
  }

  // if (checkSkills(jobData.skills) === false) {
  //   console.log(
  //     "🚀 ~ checkSkills(jobData.skills) === false:",
  //     checkSkills(jobData.skills) === false
  //   );
  //   return false;
  // }

  // If all checks pass, accept the job

  console.log("🚀 ~ Should accept job by formula:", true);
  return true;
};

const jobExample = {
  description: `
    Main Tasks & Responsibilities\n\nDeveloping web apps using React\n\nBuilding reusable backend APIs using Node JS\n\nBuilding reusable components and front-end libraries for future use\n\nTranslating designs and wireframes into high quality code\n\nOptimising components for maximum performance across a vast array of web-capable devices and browsers\n\nEnsure that apps are built in a secure manner\n\nEnsure that all system changes/functionalities are tested sufficiently\n\nAct as a design consultant across all assigned IT projects\n\nSupport, resolve and document issues that arise in the production environment. This may include reviewing designs & code, recommending improvements.\n\nAny other duty as reasonably directed\n\nSEQ responsibilities as specified in MAN002 SEQ Management Plan\n\nMinimum Qualifications And Experience\n\nThorough understanding of React and its core principles\n\nThorough understanding of Node Js and RDBMS\n\nKnowledge of React Native development\n\nKnowledge of modern authorisation mechanisms, such as JSON Web Token\n\nStrong proficiency in JavaScript, including DOM manipulation and the JavaScript object model\n\nAWS knowledge is a plus\n\nExperience with GraphQL is a plus\n\nIf you're ready for a new project or know someone perfect for this role, don't hesitate to reach out\n\nCONTACT US NOW!\n\nIT People Australia\n\ninfo@itpeopleaustralia.com.au\n\n❗Please note that applicants must be based in Sydney
    `,
  skills:
    "Angular, Cascading Style Sheets (CSS), HTML5, JavaScript, Redux.js, Server Side, Test-Driven Development, TypeScript, User Experience (UX), User Interface Design",
};

// console.log(shouldAcceptJob(jobExample, candidateSkills, rejectingSkills, 4));

export default shouldAcceptJob;
