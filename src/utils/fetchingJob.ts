import { JSDOM } from "jsdom";

/**
 * Adds spaces after periods that are between a letter and a capital letter
 * @param {string} text - The input text
 * @returns {string} - The text with proper spacing after periods
 */
function addSpacesAfterPeriods(text: string): string {
  return text.replace(/(?<=[a-z])\.(?=[A-Z])/g, ". ");
}

/**
 * Removes "Show more"/"Show less" and excess whitespace from the end of text
 * @param {string} text - The input text
 * @returns {string} - The cleaned text
 */
function removeShowMoreLess(text: string): string {
  return text.replace(/\s*Show\s*more\s*Show\s*less\s*$/i, "");
}

/**
 * Extracts the job description from a given HTML string using JSDOM.
 *
 * @param {string} htmlString - The HTML content as a string.
 * @returns {string} - The extracted job description or an error message.
 */
function extractJobDescriptionUsingJSDOM(htmlString: string): string {
  // 1. Parse the HTML string using JSDOM
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  // 2. Find the container that holds the job description.
  // Adjust the selector if needed.
  const descriptionContainer = document.querySelector(".description__text--rich");
  const skills = document.querySelector(
    ".job-details-preferences-and-skills__modal-section-insights-list-item"
  );
  if (skills) {
    console.log("🚀 ~ extractJobDescriptionUsingJSDOM ~ skills:", skills.textContent);
  }

  if (descriptionContainer) {
    // 3. Extract and clean the text content from the container.
    let text = descriptionContainer.textContent;
    // Replace multiple newline characters with a single newline and trim extra whitespace.
    text = text.replace(/\n\s*\n/g, "\n").trim();
    text = addSpacesAfterPeriods(text);
    text = removeShowMoreLess(text);
    // 4. Return the cleaned text.
    return text;
  } else {
    return "Job description not found.";
  }
}

const fetchJob = async (jobUrl: string): Promise<string> => {
  // this function should return the html content of the url passed as parameter as a string
  const htmlContent = await fetch(jobUrl).then((res) => res.text());
  // console.log("🚀 ~ fetchJob ~ htmlContent:", htmlContent)
  const description = await extractJobDescriptionUsingJSDOM(htmlContent);
  // console.log("🚀 ~ fetchJob ~ description:", description);
  return description;
};

// fetchJob("https://www.linkedin.com/jobs/view/4132604918")
// fetchJob("https://www.linkedin.com/jobs/view/4143958733")
// fetchJob("https://www.linkedin.com/jobs/view/4087488707")

export default fetchJob;
