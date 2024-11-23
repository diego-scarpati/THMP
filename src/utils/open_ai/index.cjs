const { PythonShell } = require("python-shell");
const path = require("path");
// import { PythonShell } from "python-shell";
// import path from "path";

const jobDescription =
  "We are hiring a talented UI Developer. You will be responsible for creating beautiful and intuitive user interfaces for our web applications. Requirements Bachelor's degree in Computer Science or a related fieldProven work experience as a UI Developer or similar roleProficiency in HTML, CSS, and JavaScriptExperience with front-end frameworks such as Angular, React, or Vue.jsStrong understanding of responsive design principlesExperience with UI design tools such as Adobe XD or Sketch is a plusKnowledge of web accessibility standards and best practicesStrong problem-solving and analytical skillsExcellent communication and collaboration skills Benefits About Us Zone IT Solutions is Australia based Recruitment Company. We specialize in Digital, ERP and larger IT Services. We offer flexible, efficient and collaborative solutions to any organization that requires IT, experts. Our agile, agnostic and flexible solutions will help you source the IT Expertise you need. Our delivery Offices are in Melbourne, Sydney and India. If you are looking for new opportunities your profile at Careers@zoneitsolutions.com or contact us at 0434189909 Also follow our LinkedIn page for new job opportunities and more. Zone IT Solutions is an equal opportunity employer and our recruitment process focuses on essential skills and abilities. We welcome applicants from a diverse range of backgrounds, including Aboriginal and Torres Strait Islander peoples, people from culturally and linguistically diverse (CALD) backgrounds and people with disabilities.";
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

let options = {
  mode: "text",
  pythonOptions: ["-u"],
  scriptPath: path.join(__dirname),
  // scriptPath: path.join(__dirname, "open_ai"),
  args: [JSON.stringify(jobDescription), JSON.stringify(resume), 1],
};

PythonShell.run("coverLetter.py", options, (err, results) => {
  if (err) throw err;
  return results;
})
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.error(err);
  });
