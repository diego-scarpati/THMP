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

// const descriptions = [
//   {
//     description:
//       "Our client is looking for an experienced React Developer / Lead for a contract role in Sydney. If you are interested in this opportunity, please share your contact details or CV to facilitate further discussion.\nFor more details, please contact Shanta @ shanta@reninfo.com.au or +61466985570.\nJob Description\nRole: React Developer / LeadLocation: Sydney\nSkills:• Strong HTML5, CSS3, JS, jQuery experience• Strong proven experience with ReactJS• Experience with redux-forms and redux-saga• Experience with Jest for Unit Tests• Experience with creating API specs using Open API Swagger• Experience with developing APIs using NodeJS is preferred, but not mandatory.\n\n\nIf you are inclined towards this opportunity, we kindly request that you share your contact details or CV to facilitate further discussion. | shanta@reninfo.com.au | +61466985570\nAbout Us: Renaissance Info Systems is a technology and digital recruitment agency, connecting contract and permanent professionals with clients across Asia-Pacific. We aim to differentiate ourselves through our level of responsiveness, and our understanding that comes from being an IT recruitment agency from the IT Industry. Our recruiters balance sophisticated and simple inter-personal techniques to assure a strong candidate network.KnowMore: http://www.reninfo.com.au",
//   },
//   {
//     description:
//       ".NET Developer | Short Term Contract | $600 per day\nWe are looking for a contractor to plug a few holes at one of our clients for a few months.\nThis role is likely to last until at least February, but may be extended.\nTech Stack:.NET CoreMicrosoft AzureCI/CDReact\nSalaryThey offer a daily rate up to $600.\nLocationHybrid - Sydney\nHow to ApplyPlease apply asap with your CV to be considered for this position. You can also get in touch with me on megan@pearsoncarter.com or reach out on 037 045 5354.\nPearson Carter is the Global Leader in Software Development Recruitment with specialist roles across the globe - www.pearsoncarter.com",
//   },
//   {
//     description:
//       "We’re excited to partner with a well-known Australian brand in their search for a talented Mid-Level Backend Python/SQL Developer! Join their growing team to deliver impactful data-driven client projects that make a difference.\nWhat You'll Do:Develop: Create robust, scalable APIs using Python, helping build SaaS solutions that stand the test of time.Collaborate: Work closely with frontend and DevOps teams for smooth integration and deployment.Mentor: Provide guidance to junior developers and promote best coding practices.Shape: Contribute to architecture discussions, steering technical decisions toward project success.\nWhat You'll Bring:Python Proficiency: Advanced skills in Python, with hands-on experience in frameworks like Django, FastAPI, and Flask.SQL and Cloud Expertise: Strong knowledge of SQL databases for scalable, reliable solutions.Cloud Proficiency: Knowledge of AWS, GCP or Azure.\nWhat's in It for You?\nCompetitive Salary: Fair and rewarding pay for your skills.Exciting Projects: Work on diverse AI/ML and data-led initiatives.Career Growth: Real pathways to advance in a supportive environment.Hybrid Working: Sydney CBD-based with flexible remote options.\nIf you're an innovative Backend Developer eager to shape the future of data-driven solutions, we’d love to hear from you! Reach out with any questions at kyra@thedrivegroup.com.au.\nFor The Latest Jobs, Tech News or to 'Introduce A Friend' for a $1000 Referral Fee - Follow Us On Linkedin:\nhttps://www.linkedin.com/company/thedrivegroup\nTheDriveGroup is 100% committed to improving meaningful diversity in the technology industry.\nWe partner with clients who embrace diversity and seek candidates across all backgrounds, abilities, genders, sexualities, cultures, and faiths.",
//   },
//   {
//     description:
//       "About Us\nWe are a dynamic FinTech startup revolutionizing bill payments, one bill at a time. Since our launch in February 2018, we’ve expanded across Australia and the United States, helping hundreds of thousands of people manage and pay millions of bills. Our mission: to help people build a happier relationship with their money, starting with their bills.\nOur team thrives on collaboration, innovation, and a bit of fun while solving meaningful problems. We’re committed to agile development and believe in a lean, efficient approach as we scale with our growing user base. If you’re ready to join a fast-paced team making a real impact, we want to hear from you.\nA little bit about the role\nWe are seeking a highly motivated software developer with a passion for driving business strategy. This role is ideal for someone who not only excels in software development but is also eager to make a difference by testing new ideas and making recommendations based on their results. \nAs a member of our Engineering team you will work within existing technical processes to ensure your code changes meet quality expectations. Reporting directly to the General Manager you will put your software development skills to work by deploying growth experiments in the form of A/B tests and implementing various enhancements to our platforms.\nResponsibilities\nGrowth and A/B Testing: Collaborate with business stakeholders to contribute and implement ideas to drive business growth. Plan, develop, deploy, and analyze A/B tests in both our web application and sometimes, our mobile app. Create reports from test results and translate findings into actionable insights and recommendations.Marketing Initiatives: Support various marketing and other initiatives as directed, which may include platform integration with advertising networks, developing and updating landing pages, CMS and implementing various technical changes to support SEO.Collaboration and Innovation: Engage with other teams to understand and address their needs, contributing innovative ideas to drive growth and achieve business goals.Technical Development: Write clean, performant, decoupled, testable, and maintainable code, ensuring high standards and quality in front-end development, inline with existing technology methodologies and tools.Tool and Workflow Management: Use existing GIT and CI/CD tools to maintain efficient workflows and ensure timely deployments.\nQualifications\n3+ years of experience in both front and back end software development, specifically ReactJS and TypescriptStrong understanding of Python and OOP modelsDemonstrated ability to write performant, maintainable, and testable codeExperience with distributed version control (GIT) and CI/CD toolsKnowledge of SQL and relational databasesBonus: experience with React NativeStrong understanding of web application development (bonus for hands-on experience with mobile)Achievement-focused and comfortable to work flexible hours from time to time to meet goals and deadlinesBusiness acumen and interest in collaborating on growth initiatives, including familiarity with A/B testing, working with data and interpreting it to inform business decisionsExperience or familiarity with digital marketing including SEO\nBenefits\nFull remote work-from-home flexibility.A dynamic, results-driven work environment with opportunities for growth and innovation.Collaborative and supportive culture focused on personal empowerment and development.Negotiable salary.\nAdditional Information\nA background and police check will be required as part of the recruitment process.For Australian candidates: Applicants must hold citizenship, permanent residency, or a work visa.",
//   },
//   {
//     description:
//       "About Infosys:\nInfosys is a global leader in next-generation digital services and consulting. We enable clients in 56+ countries to navigate their digital transformation. With over four decades of experience in managing the systems and workings of global enterprises, we expertly steer our clients through their digital journey. We do it by enabling the enterprise with an AI-powered core that helps prioritize the execution of change. We also empower the business with agile digital at scale to deliver unprecedented levels of performance and customer delight. Our always-on learning agenda drives their continuous improvement through building and transferring digital skills, expertise, and ideas from our innovation ecosystem.\nVisit www.infosys.com to see how Infosys (NYSE: INFY) can help your enterprise navigate your next.\n\n\nJob Location: Sydney, Australia\n\nSalary range: AUD 90,243 – 98,861 (Annual Gross)\nPlease Note: - \nThe above salary range is only indicative and maybe subject to suitable enhancements, based on internal company processes.\n\nShort Description: \n We are seeking a skilled and motivated ReactJS Frontend Developer to join our team. The ideal candidate will have a passion for building user-friendly, responsive web applications using ReactJS and related technologies. You will work closely with our Solution Designer and Backend teams to deliver high-quality and maintainable code.\n\n\nRoles and Responsibilities: Develop and maintain dynamic, high-performance web applications using ReactJS, Redux and NodeJSCollaborate with UX/UI designers to translate design concepts into functional user interfaces.Optimize applications for maximum speed and scalability.Ensure cross-browser compatibility and responsiveness of applications.Integrate with backend services and APIs to fetch and manage data.Write clean, maintainable, and efficient code with thorough documentation.Participate in code reviews and contribute to best practices for front-end development.\n\nSkills /Competencies:\nEssential:Proven experience as a ReactJS Frontend Developer or similar role.Strong proficiency in ReactJS, including hooks, context API, and state management.Experience with JavaScript (ES6+), HTML5, CSS3, and responsive design principles.Familiarity with RESTful APIs and asynchronous programming.Knowledge of version control systems, such as Git.Experience with Redux Saga/ThunkAbility to troubleshoot and debug issues efficiently.Strong problem-solving skills and attention to detail.Excellent communication and teamwork skills\nPreferred: Experience with TypeScript.Knowledge of modern front-end frameworks and libraries (e.g., Redux, Next.js).Familiarity with testing frameworks and methodologies (e.g., Jest, React Testing Library).Understanding of accessibility standards and practices.Experience with UI/UX design tools (e.g., Figma, Sketch) is a plus.\nAdditional Skills:Excellent customer interfacing skills.Excellent written and verbal communication skills.Strong attention to detail and outstanding analytical and Problem-solving skillsTeam ManagementIteration Management\nInfosys is an equal opportunity employer and encourages applications from suitably qualified and eligible candidates regardless of gender or other attribute covered by equal opportunity legislation. At Infosys, we recognize that everyone has individual requirements. If you are a person with disability, illness or injury and require adjustments to the recruitment and selection process, please contact our Recruitment team for adjustment only on Infosys_ta@infosys.com or include your preferred method of communication in email and someone will be in touch. Please note in order to protect the interest of all parties involved in the recruitment process, Infosys does not accept any unsolicited resumes from third party vendors. In the absence of a signed agreement, any submission will be deemed as non-binding and Infosys explicitly reserves the right to pursue and hire the submitted profile. All recruitment activity must be coordinated through the Talent Acquisition department. “All aspects of employment at Infosys are based on merit, competence and performance. We are committed to embracing diversity and creating an inclusive environment for all employees. Infosys is proud to be an equal opportunity employer.”",
//   },
//   {
//     description:
//       "We’re partnering with a forward-thinking digital marketing agency renowned for crafting data-driven strategies and delivering innovative web solutions. With a client portfolio spanning various industries and a focus on e-commerce, this agency offers an exciting and fast-paced work environment.\nAbout the Role:We are seeking an experienced Full Stack Web Developer with expertise in custom WordPress development. This pivotal role demands a proactive, detail-oriented professional who can confidently develop, maintain, and enhance WordPress and WooCommerce websites, while also contributing to technical support and advanced tracking solutions.\nKey Responsibilities:Develop custom WordPress websites from scratch without reliance on page builders like Elementor or Divi.Maintain and improve e-commerce platforms, primarily WooCommerce, with some exposure to Shopify.Manage basic DevOps tasks, including setting up and maintaining hosting environments, DNS, and staging.Integrate third-party APIs, ensuring seamless connectivity between platforms.Implement and manage advanced tracking systems, including Google Analytics and Google Tag Manager, with an understanding of data layers.Collaborate on projects involving PHP, JavaScript, and database management.Coordinate effectively with offshore teams, ensuring timely project delivery and quality outcomes.Engage in client communication, interpreting briefs and providing regular updates.\nAbout You:To excel in this role, you’ll need:Proven experience in custom WordPress development.Strong knowledge of PHP, MySQL, JavaScript, and responsive design principles.Familiarity with WooCommerce and an understanding of Shopify development.Competence in API integrations and tracking tools like GA and GTM, including advanced data layer implementation.Basic DevOps knowledge to manage hosting environments and staging setups.Excellent troubleshooting skills with a proactive approach to problem-solving.Strong project management abilities and stakeholder communication skills.A commitment to coding best practices and delivering exceptional user experiences.\nWhat’s in It for You:Work on diverse, technically challenging projects across industries.Collaborate with a supportive and innovative team.Opportunities to develop professionally and enhance technical expertise.Competitive salary of $110,000-$140,000+Super and benefits, aligned with your experience and skillset.\nIf you thrive in a fast-paced environment and are ready to contribute to cutting-edge projects, apply now to take the next step in your career.",
//   },
//   {
//     description:
//       "IAM Specialist - Developer (NW11174)Sydney, New South Wales, Australia (Hybrid)\nASX: Powering Australia's financial markets \nWhy join the ASX? When you join ASX, you’re joining a company with a strong purpose – to power a stronger economic future by enabling a fair and dynamic marketplace for all. In your new role, you’ll be part of a leading global securities exchange with a strong brand. We are known for being a trusted market operator and an exciting data hub. Want to know why we are a great place to work, visit our careers page to learn more.\nWe are more than a securities exchange!The ASX team brings together talented people from a diverse range of disciplines. We run critical market infrastructure, with 1 in 3 people employed within technology. Yet we have a unique complexity of roles across a range of disciplines such as operations, program delivery, financial products, investor engagement, risk and compliance.We’re proud of the diversity of our organisation and the culture of inclusion that all our people help to build every day. Our employee-led groups are known for celebrating cultural and religious events, championing LGBTIQ+ inclusion, inspiring giving and volunteering, promoting gender equality, and wellbeing. We are an Employer of Choice for Gender Equality (WGEA) and a member of the Champions of Change Coalition for the advancement of gender equality in Australia. \nWhat you will be doing:Identity and Access Management development work for BAU and Project related tasks / processes with intention to integrate with the Sailpoint Identity Management PlatformManage the Dev Ops deployment approach for the ASX Identity rollout processAssist with the solutions design / architecture of IAM projects by applying your experience of IAM systemsWork with business stakeholders to: Identify and implement business specific access using the company role-based access models to help promote security and efficiencyPerform developmental work to meet required project and day to day needs surrounding access and management of internal accounts, entitlements and rolesOn-boarding of external customer access to various in-house systems and applications utilising your developmental skillset to code and adapt code where required Analyse, develop and implement appropriate segregation of dutiesDesign, develop and implement Privileged Access roles and rules to facilitate controlled access to ASX systemsDeal with internal teams to achieve resolution of issues or requests as requiredEnsure IAM policies and procedure documentation remain current, meet with compliance and are adhered tooAssist in the investigation, identification and documentation of IAM risks and associated controls with a lens on the products you will on-board\nWhat you will bring:Foundation in modern development practices and languages such as: Java, JavaScript/Groovy, Beanshell, etc.Experience with Dev Ops practices for deploying & managing deployments including CI/CD tools such as Git/GitHub, Bamboo/Jenkins, GOCD, AnsibleExperience in the delivery & support of identity management solutions for internal customer facing scenariosUnderstanding of Privileged Access conceptsExperience with large-scale enterprise infrastructureUnderstanding or experience with patching and upgrading of operating systems and SailPoint applicationKnowledge or experience with database security conceptsWorking knowledge of networking principlesUnderstanding or experience with Multi-factor authentication technologiesFamiliarity with: Windows and Linux Operating systems Application solutions such as Active Directory, Entra ID, M365, SQL Databases Data scripting, extraction, transformation and loadingTechnical documentation\nAnd if you’ve got some of this, even better:Knowledge or experience with the BeyondTrust and / or ForgeRock Identity PlatformsMust be able to think out of the box to troubleshoot non-standard / undocumented issues, and to look at the big picture and determine solutions that fit within the existing frameworkBe confident to provide input to assist with continual improvementsExperience in implementing OAUTH2 / OpenID Connect (OIDC) / SAML 2.0 flowsBeen accountable for execution according to established standards, procedures, and processesBeen accountable for day-to-day system support requirementsKnowledge or experience with Cloud platforms and applications technologies (Google, EntraID and AWS)Financial services experience \nWhat you need to enjoy and be good at for this role:Keen developer mindset who likes delivering good experiences for customersStrong control awareness in an environment where there is no compromise on process controlsAnalytical approach to identify current user profiles, map them to access matrices / models / roles and ensure these are maintained and reviewed appropriatelyEnjoy working in a collaborative environment to implement and maintain best practise security protocolsInquisitive nature to question the process to drive innovationBe a self-starter and take initiative to communicate, interact and cooperate with othersAbility to adapt to high pressure situations and prioritiesWillingness to have a laugh with team mates to help ease Stress level\n\nWe make hiring decisions based on your skills, capabilities and experience, and how you’ll help us to live our values. We encourage you to apply even if you don’t meet all the criteria of this role. If you need any adjustments during the application or interview process to help you present your best self, please let us know.At ASX Group, our diverse workforce is essential to build and maintain a fair and dynamic marketplace. We support flexible working and offer hybrid working options. Even if our roles are advertised as full-time, we encourage you to apply if you are interested in part-time or other flexible working arrangements.We will arrange for successful candidates to have background checks, including reference and police checks completed as part of the on-boarding process.\nRecruitment Agencies: ASX does not accept any unsolicited agency resumes and will not be responsible for any fees related to unsolicited resumes.",
//   },
//   {
//     description:
//       "swipeJobs is a fast-growing, disruptive, and award-winning on-demand staffing platform that is transforming the way people find work and businesses manage their workforce. Our platform connects job seekers with employers, allowing businesses to easily fill their staffing needs. We are slowly becoming the stand alone market leader in the US market and are looking for the right candidate to join us on this exciting journey.\nWe are seeking a highly skilled and motivated Front-end Engineer to join our tech team. As a Engineer at swipejobs, you will play a crucial role in building and enhancing our innovative market leading web applications.\nResponsibilities: Collaborate with the product team to understand project requirements and translate them into scalable and efficient front end developmentDevelop new user-facing features and components using TypeScript and React.jsOptimise application performance and ensure high responsivenessBuild reusable code and libraries for future useParticipate in code reviews to maintain code quality and ensure best practicesWork closely with the UI/UX designers to implement visually appealing and intuitive user interfaces\nExperience:Australian market experience in an extremely fast-paced and extreme agile environmentHands-on development expertise with JavaScript, HTML5, React, Angular and any CSS preprocessor like SCSS or LESSAdvance understanding of TypeScript & React.jsGood working knowledge of Micro FrontendsKnowledge of source control systems, GIT preferredExperienced with TDD and writing test casesIntegration with RESTful APIs\nWhy swipejobs: A chance to work on a market leading US software productEnd to end exposure to the full software development life cycleWorking in a start up environment with modern offices located in North SydneyA flat organisational structure where everyone is always accessibleOperating in a fast paced and dynamic environment that provides exciting challenges dailyA chance to work on modern technology stack which is cutting edge even for the USFood provided throughout the day whilst working in the office including a free lunchRegular social events in and outside the office\nIf you are talented, driven and interested in joining us in our journey; we would like to hear from you. Please email me at Matt.Lane@swipejobs.com or click apply now!\nswipejobs is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.\nFor more information about swipejobs and our services, visit https://www.swipejobs.com/",
//   },
//   {
//     description:
//       "We are after several talent game developers with experience in Cocos or Unity for long term projects. The positions offer the possibility of remote work with flexible hours. May occasionally required to travel to office.\nSalary range AUD$130,000 to AUD$220,000 depends on skills\nJob Responsibilities:Responsible for designing and developing core client modules, ensuring code quality and efficiency.Collaborate with designers and backend developers to implement game logic, interaction design, and more.\nQualifications:Bachelor’s degree or higher in a computer-related field, with 3+ years of experience in H5 application developmentProficient in using Cocos Creator, and familiar with network communication technologies such as TCP/IP, WebSocket, and HTTP.Strong sense of responsibility, good teamwork and task-following skills, excellent communication, and the ability to work under pressure.Experience in resource and performance optimization, with skills in troubleshooting and problem-solving preferred.Prior experience with Android and iOS native development, able to independently integrate SDKs, is a plus.Familiarity with various mobile games and understanding of player psychology and operating habits is a plus.Extensive experience with other game engines, such as Unity, Laya, Egret, is also welcomed.",
//   },
//   {
//     description:
//       "About Infosys: Infosys is a global leader in next-generation digital services and consulting. We enable clients in 50 countries to navigate their digital transformation. With over three decades of experience in managing the systems and workings of global enterprises, we expertly steer our clients through their digital journey. We do it by enabling the enterprise with an AI-powered core that helps prioritize the execution of change. We also empower the business with agile digital at scale to deliver unprecedented levels of performance and customer delight. Our always-on learning agenda drives their continuous improvement through building and transferring digital skills, expertise, and ideas from our innovation ecosystem. Visit www.infosys.com to see how Infosys (NYSE: INFY) can help your enterprise navigate your next.\nLocation: Sydney (Australia)\nSalary: AUD 108,571-119,893 (Annual Gross)\nPlease Note:- The above salary range is only indicative and maybe subject to suitable enhancements, based on internal company processes. \nShort Description: In the role of Senior Consultant, you will be expected to develop bespoke applications in the banking domain. This role will interface with client and elicit technical requirements, design and develop technical components. If your passion is to build solutions that really make a difference to enterprises, the community and your world, Infosys is the right place for you. \nRoles and Responsibilities: • Detailed Design• Closely work with Technical Solution Architect and process Functional Lead\n Skills /Competencies:\nEssential:Proficient in any of the key skillsDeveloping web pages using React JS, Redux (UI Developer), JestSpring Microservices, Spring Rest, Spring boot (Swagger, REST API, JAX-RSCore JAVA, J2EE, SQLGood Working knowledge of Log Analysis (Splunk).Strong hands-on experience with source code management systems and CI CD tools – Git and Bamboo.Experience with Mavin, Gradle, Junit test and MockitoExperience in all phase of SDLC like Requirement Analysis, Implementation and Maintenance, and extensive experience with Agile and SCRUM.Experience in Design and Development of customer facing web applicationsExperience in working in onshore / offshore model leading the offshore teams\nPreferred:Excellent customer interfacing skills.Excellent written and verbal communication skills.Strong attention to detail and outstanding analytical and Problem-solving skills.\nAdditional Skills:Excellent customer interfacing skills.Excellent written and verbal communication skills.Strong attention to detail and outstanding analytical and Problem-solving skills.\n\nAll aspects of employment at Infosys are based on merit, competence and performance. We are committed to embracing diversity and creating an inclusive environment for all employees. Infosys is proud to be an equal opportunity employer.At Infosys, we recognize that everyone has individual requirements. If you are a person with disability, illness or injury and require adjustments to the recruitment and selection process, please contact our Recruitment team for adjustment only on Infosys_ta@infosys.com or include your preferred method of communication in email and someone will be in touch.Please note in order to protect the interest of all parties involved in the recruitment process, Infosys does not accept any unsolicited resumes from third party vendors. In the absence of a signed agreement any submission will be deemed as non-binding and Infosys explicitly reserves the right to pursue and hire the submitted profile. All recruitment activity must be coordinated through the Talent Acquisition department.",
//   },
// ];

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
    return results[0];
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

module.exports = { acceptByFormula, saveToFile, gptApproval, resume };
