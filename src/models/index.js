import Job from "./Job";
import JobDescription from "./JobDescription";
import CoverLetter from "./CoverLetter";
import Keyword from "./Keyword";

Job.hasOne(JobDescription , {foreignKey: 'id'})
JobDescription.belongsTo(Job, {foreignKey: 'id'})

Job.belongsToMany(Keyword, {through: 'JobKeyword', foreignKey: 'jobId'})
Keyword.belongsToMany(Job, {through: 'JobKeyword', foreignKey: 'keywordId'})

Job.hasOne(CoverLetter, {foreignKey: 'id'})
CoverLetter.belongsTo(Job, {foreignKey: 'id'})

export { Job, JobDescription, CoverLetter, Keyword };