import Job from "./Job.ts";
import JobDescription from "./JobDescription.ts";
import CoverLetter from "./CoverLetter.ts";
import Keyword from "./Keyword.ts";

Job.hasOne(JobDescription, { foreignKey: "id" });
JobDescription.belongsTo(Job, { foreignKey: "id" });
// Correcting Job and JobDescription
// Job.hasOne(JobDescription, { foreignKey: 'jobDescriptionId' }); // jobId is the foreign key in JobDescription
// JobDescription.belongsTo(Job, { foreignKey: 'jobId' });

Job.belongsToMany(Keyword, { through: "JobKeyword", foreignKey: "jobId" });
Keyword.belongsToMany(Job, { through: "JobKeyword", foreignKey: "keywordId" });

Job.hasOne(CoverLetter, { foreignKey: "id" });
CoverLetter.belongsTo(Job, { foreignKey: "id" });
// Job.hasOne(CoverLetter, { foreignKey: 'jobId' });
// CoverLetter.belongsTo(Job, { foreignKey: 'jobId' });

export { Job, JobDescription, CoverLetter, Keyword };
