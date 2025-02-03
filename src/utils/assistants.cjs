const OpenAI = require("openai");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const { OPENAI_API_KEY, GPT_APPROVAL_V1 } = process.env;

const descriptionExample = `
Job Description

We’re seeking a talented Software Developer with a focus on building exceptional React-based frontends. This role is open to mid-level and senior candidates who are passionate about creating intuitive, user-friendly interfaces that drive value for businesses. As part of our high-performing team, you’ll work on diverse, challenging projects, ranging from modernising enterprise platforms to developing innovative digital solutions. You’ll collaborate closely with cross-functional teams to design, build, and deliver applications that delight users and exceed expectations.

You are passionate about creating polished, user-focused applications and thrive in collaborative, agile environments. You balance technical expertise with creativity and enjoy solving complex challenges to deliver impactful solutions.

Responsibilities

Frontend Development:
Build modern, scalable, and responsive web applications using React.
User Interface Design:
Collaborate with designers and stakeholders to create visually appealing and intuitive user experiences.
Code Quality Assurance:
Ensure high-quality code through unit testing, code reviews, and adherence to best practices.
Continuous Improvement:
Participate in agile development processes, contributing to planning, coding, testing, deployment, and ongoing support.
Collaboration:
Work with cross-functional teams, including backend developers, designers, and product managers, to ensure cohesive and impactful project delivery

Qualifications

Technical Expertise:
Strong commercial experience with React and related frontend technologies 
Frontend Focus:
Proven ability to develop and maintain scalable, performant, and maintainable front-end applications.
Learning Agility:
Enthusiasm for learning new frameworks, libraries, and tools to meet project requirements.
Cloud Experience:
Familiarity with cloud platforms (e.g., AWS, GCP, Azure) is a plus.
Code Craftsmanship:
Ability to craft high-quality, maintainable, and efficient code that meets requirements.
Best Practices:
Solid understanding of front-end coding standards, design patterns, and web security best practices.
Communication Skills:
Strong ability to communicate effectively with internal and external stakeholders.
`;

const approveByAssistantGPT = async (job) => {
  const jobDescription = job.description;
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  try {
    // Create a thread
    const thread = await openai.beta.threads.create();
    console.log("🚀 ~ approvedByGPT ~ thread:", thread);

    // Create a message
    const userMessage = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: jobDescription,
    });

    // Create a run with stream
    const stream = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: GPT_APPROVAL_V1,
      stream: true,
    });
    let message;
    for await (const event of stream) {
      if (event.event !== "thread.message.completed") continue;
      message = event.data.content[0].text.value;
    }
    message = message === "true" ? "yes" : "no";
    return message;
  } catch (error) {
    console.log("🚀 ~ approvedByGPT ~ error:", error);
  }
};

const retrieveRun = async (threadId, runId) => {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
  try {
    const thread = await openai.beta.threads.runs.retrieve(threadId, runId);
    console.log("🚀 ~ retrieveRun ~ thread:", thread);
  } catch (error) {
    console.log("🚀 ~ retrieveRun ~ error:", error);
  }
};

const retrieveAllRuns = async (threadId) => {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
  try {
    const runs = await openai.beta.threads.runs.list(threadId);
    console.log("🚀 ~ retrieveAllRuns ~ runs:", runs);
    console.log("🚀 ~ retrieveAllRuns ~ runs.response:", runs.response);
    console.log("🚀 ~ retrieveAllRuns ~ runs.body.data:", runs.body.data);
  } catch (error) {
    console.log("🚀 ~ retrieveAllRuns ~ error:", error);
  }
};

const retrieveThread = async (threadId) => {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
  try {
    const thread = await openai.beta.threads.retrieve(threadId);
    console.log("🚀 ~ retrieveThread ~ thread:", thread);
  } catch (error) {
    console.log("🚀 ~ retrieveThread ~ error:", error);
  }
};

module.exports = { approveByAssistantGPT };
