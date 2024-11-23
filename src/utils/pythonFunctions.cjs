const { PythonShell } = require("python-shell");
const path = require("path");

const resume = {
  personal_profile: {
    name: "Diego Scarpati",
    citizenship: ["Argentinean", "Italian"],
    location: "Sydney, Australia",
    email: "diegoscarpati13@gmail.com",
    phone: "+61 499 404 825",
    website: "https://diegoscarpati.com",
    linkedin: "https://www.linkedin.com/in/diego-scarpati/",
    whatsapp: "https://wa.me/+61499404825",
  },
  professional_profile: {
    visa_status: "Working Holiday visa (subclass 417)",
    visa_validity: "October 13th 2025",
    visa_extension_possibility: "Until 2026",
    skills: {
      hard_skills: {
        programming_languages: {
          front: ["Next.js", "React", "React Native", "Redux", "HTML", "CSS"],
          back: [
            "NodeJs",
            "Express",
            "Sequelize",
            "Postgres",
            "Mongo",
            "MySQL",
            "Docker",
            "Python",
          ],
          blockchain: ["Solidity", "Truffle", "Ganache"],
          collaborative: ["GIT"],
        },
        methodologies: ["Agile", "Scrum"],
      },
      soft_skills: [
        "Learning and teaching skills",
        "Results and detail-oriented",
        "Teamwork and independent work",
        "Ability to work under pressure and multi-task",
      ],
    },
  },
  professional_experience: [
    {
      company: "AdaSouls",
      role: "Web3 Fullstack Developer",
      dates: "Mar 2024 - Present",
      responsibilities: [
        "Building a Backend and API with NodeJs, Express, Sequelize and a DB with Postgres",
        "Integrating the Frontend to both Blockchain and Backend with ReactJS and Solidity",
      ],
    },
    {
      company: "Flock IT (ARG)",
      role: "Research and Development",
      dates: "Nov 2022 - Sep 2023",
      responsibilities: [
        "Researching about Self-Sovereign Identity and Blockchain solutions",
        "Building a React Native Mobile App with Expo and Typescript",
      ],
    },
    {
      company: "Plataforma 5 (ARG)",
      role: "FullStack Student",
      dates: "Apr 2022 - Jul 2022",
      responsibilities: [
        "Developing an app with Scrum methodology using React Native, Redux, Express and Postgres for HR of a LatAm Firm",
        "Building an e-commerce as a SPA using ReactJS, Redux, Express and Postgres in two weeks",
      ],
    },
    {
      company: "Ernst & Young (ARG)",
      role: "Senior External Auditor",
      dates: "Dec 2017 - Apr 2021",
      responsibilities: [
        "Building the Financial Statements according to IFRS and ARG-GAAP",
        "Scheduling meetings with client’s staff and following up with the planned timeline (Agile)",
      ],
    },
    {
      company: "Blue Guardian S.A. (ARG)",
      role: "Administrative",
      dates: "Jun 2017 - Nov 2017",
      responsibilities: [
        "Data entry and data management using ERP software (TANGO)",
      ],
    },
  ],
  education: [
    {
      course: "Building AI Apps with the OpenAI API",
      institution: "ZTM",
      year: 2024,
    },
    {
      course: "Prompt Engineering Bootcamp",
      institution: "ZTM",
      year: 2024,
    },
    {
      course: "The Complete NFT Web Dev Course",
      institution: "Udemy",
      year: 2023,
    },
    {
      course: "Junior to Senior Web Developer",
      institution: "ZTM",
      year: 2023,
    },
    {
      course: "Solidity, Ethereum and Blockchain",
      institution: "ZTM",
      year: 2023,
    },
    {
      course: "React Native",
      institution: "Udemy",
      year: 2023,
    },
    {
      course: "Blockchain Ethereum Solidity",
      institution: "Education IT",
      year: 2022,
    },
    {
      course: "Ethereum and Solidity",
      institution: "Udemy",
      year: 2022,
    },
    {
      course: "React - The Complete Guide",
      institution: "Udemy",
      year: 2022,
    },
    {
      course: "JavaScript Bootcamp",
      institution: "Plataforma5",
      year: 2022,
    },
  ],
};

// const job = {
//   "id": "4063387827",
//   "title": "French-Speaking Web/Java developer",
//   "url": "https://www.linkedin.com/jobs/view/4063387827",
//   "referenceId": "W/cMiFMC8T8Gp2/vXxDKEQ==",
//   "posterId": "11595339",
//   "company": "maltem Paris",
//   "location": "Sydney, New South Wales, Australia (Hybrid)",
//   "type": "Contract",
//   "postDate": "2024-10-30 03:23:40 +0000 UTC",
//   "benefits": null,
//   "approvedByFormula": "yes",
//   "approvedByGPT": "pending",
//   "easyApply": "yes",
//   "createdAt": "2024-11-22T00:45:23.239Z",
//   "updatedAt": "2024-11-22T00:58:33.215Z",
//   "JobDescription.description": "FRENCH SPEAKING MANDATORYHybrid between Sydney and Noumea (New Caledonia)\nThis service consists of carrying out design and development missions for web-type applications.on the technologies and “Frameworks” used with our client. It allows the IT department to be responsive and efficient by providing a computer software development service to best meet the expressed need.The activities last for the duration of the construction sites and end with the transition into production of the solutions\nExpectations for this role• “Back-end” design and development,• “Front-end” design and development,• “Mobile App” design and development,• Design and development of operational reports,• Design and development of “UX Designer, UI Designer” ergonomics.\nExpected technology stack:•“Back-end” design and development: mastery of Springboot-type “frameworks”,Gradle.• “Front-end” design and development: mastery of Angular-type “frameworks”,Bootstrap.• Design and development of “Mobile App”: mastery of “frameworks” such as Ionic.• Design and development of operational reports: mastery of ELK “frameworks”,Jasper or Birt.• Design and development of ergonomics “UX Designer, UI Designer”: mastery ofUX techniques (CSS, HTML5...).\nTasks & duties:1. Modeling and design of applications in a WEB environment, in accordance with the baseIT department application,2. Programming, configuration, installation and optimization of components,3. Unit tests and integration testing with IS and other software packages,4. Technical writing of architecture, design and interface files, unit tests,5. Analysis of incidents, correction, testing and validation of corrections,6. Participation in updating activity monitoring indicators,7. Participation in populating the monthly project MOE monitoring dashboard\nQualifications\nBachelor's degreeexperience in DevelopmentDemonstrated ability to deliver a completed projectStrong communication skillsExperience working with a team"
// }

const acceptByFormula = async (job) => {
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: path.join(__dirname),
    args: [
      JSON.stringify(job),
      JSON.stringify([
        "C#",
        "C++",
        ".Net",
        "Goolang",
        "Golang",
        "Go",
        "C",
        "Java",
        "Spring",
        "Spring Boot",
        "Power Apps",
        "PHP",
        "Lavarel",
        "Synfony",
        "Connex",
        "AppSec",
        "Rust",
      ]),
      3,
    ],
  };

  try {
    const results = await PythonShell.run("acceptByFormula.py", options);

    // Check the last result, convert it to lowercase for robustness
    const lastResult = results[results.length - 1].toLowerCase();

    // Determine acceptance based on the Python result
    if (lastResult === "true") {
      console.log("Job accepted by formula");
      return true;
    } else {
      console.log("Job rejected by formula");
      return false;
    }
  } catch (err) {
    console.error("Error in acceptByFormula:", err);
  }
};

const saveToFile = async (jobs) => {
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: path.join(__dirname),
    args: [JSON.stringify(jobs)],
  };

  try {
    const results = await PythonShell.run("saveJobsToExcel.py", options);
    console.log("Results from saveToFile:", results);
  } catch (err) {
    console.error("Error in saveToFile:", err);
  }
};

const gptApproval = async (job) => {
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: path.join(__dirname),
    args: [JSON.stringify(job), JSON.stringify(resume), 1],
  };
  try {
    const results = await PythonShell.run("gptApproval.py", options);
    console.log("🚀 ~ gptApproval ~ results:", results);

    // Check the last result, convert it to lowercase for robustness
    const lastResult = results[results.length - 1].toLowerCase().trim();
    console.log("🚀 ~ gptApproval ~ lastResult:", lastResult);

    // Determine acceptance based on the Python result
    if (lastResult === "true") {
      console.log("Job accepted by formula");
      return true;
    } else {
      console.log("Job rejected by formula");
      return false;
    }
  } catch (err) {
    console.error("Error in acceptByFormula:", err);
  }
};

module.exports = { acceptByFormula, saveToFile, gptApproval };
