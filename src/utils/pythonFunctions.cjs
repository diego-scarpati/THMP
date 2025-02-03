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
    skills: [
      "Amazon Web Services (AWS)",
      "Attention to Detail",
      "Bootstrap",
      "Budgets",
      "Cascading Style Sheets (CSS)",
      "CI/CD",
      "Cryptocurrency",
      "DApps",
      "Decentralized Applications (DApps)",
      "Detail Oriented",
      "Dex",
      "Docker",
      "English",
      "Express.js",
      "External Audit",
      "Front-End Development",
      "Full-Stack Development",
      "Git",
      "GitLab",
      "GitHub",
      "GraphQL",
      "HTML",
      "HTML5",
      "Hardhat",
      "JavaScript",
      "Leadership",
      "Management",
      "Microsoft Office",
      "MongoDB",
      "MySQL",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Problem Solving",
      "Python",
      "Python (Programming Language)",
      "Python3",
      "React Native",
      "React.js",
      "Redux",
      "Redux.js",
      "Responsive Design",
      "Responsive Web Design",
      "Sequelize.js",
      "Smart Contracts",
      "Solidity",
      "Teamwork",
      "Time Management",
      "TypeScript",
      "UX/UI Design",
      "Web Applications",
      "Web Development",
      "Web3",
      "jQuery",
    ],
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
      course: "Testing: The Complete Developer's Guide",
      institution: "ZTM",
      year: 2024,
    },
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

// const acceptByFormula = async (job, rejectingSkills, experience) => {
//   let options = {
//     mode: "text",
//     pythonOptions: ["-u"],
//     scriptPath: path.join(__dirname),
//     args: [
//       JSON.stringify(job),
//       JSON.stringify(rejectingSkills),
//       experience,
//     ],
//   };

//   try {
//     const results = await PythonShell.run("acceptByFormula.py", options);

//     // Check the last result, convert it to lowercase for robustness
//     const lastResult = results[results.length - 1].toLowerCase();

//     // Determine acceptance based on the Python result
//     if (lastResult === "true") {
//       console.log("Job accepted by formula");
//       return true;
//     } else {
//       console.log("Job rejected by formula");
//       return false;
//     }
//   } catch (err) {
//     console.error("Error in acceptByFormula:", err);
//   }
// };

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
    return results[0];
  } catch (err) {
    console.error("Error in saveToFile:", err);
  }
};

// const gptApproval = async (job) => {
//   let options = {
//     mode: "text",
//     pythonOptions: ["-u"],
//     scriptPath: path.join(__dirname),
//     args: [JSON.stringify(job), JSON.stringify(resume), 1],
//   };
//   try {
//     const results = await PythonShell.run("gptApproval.py", options);
//     console.log("🚀 ~ gptApproval ~ results:", results);

//     // Check the last result, convert it to lowercase for robustness
//     const lastResult = results[results.length - 1].toLowerCase().trim();
//     console.log("🚀 ~ gptApproval ~ lastResult:", lastResult);

//     // Determine acceptance based on the Python result
//     if (lastResult === "true") {
//       console.log("Job accepted by formula");
//       return true;
//     } else {
//       console.log("Job rejected by formula");
//       return false;
//     }
//   } catch (err) {
//     console.error("Error in acceptByFormula:", err);
//   }
// };

module.exports = { saveToFile, resume, rejectingSkills };
