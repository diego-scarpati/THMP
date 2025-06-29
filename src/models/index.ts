import Job from "./Job.js";
import JobDescription from "./JobDescription.js";
import CoverLetter from "./CoverLetter.js";
import Keyword from "./Keyword.js";
import JobKeyword from "./JobKeyword.js";
import User from "./User.js";
import Skill from "./Skill.js";
import Exclusion from "./Exclusion.js";
import UserJob from "./UserJob.js";
import UserSkill from "./UserSkill.js";
import UserExclusion from "./UserExclusion.js";

Job.hasOne(JobDescription, { foreignKey: "id" });
JobDescription.belongsTo(Job, { foreignKey: "id" });

Job.hasOne(CoverLetter, { foreignKey: "id" });
CoverLetter.belongsTo(Job, { foreignKey: "id" });

Job.belongsToMany(Keyword, { through: JobKeyword, foreignKey: "jobId", otherKey: "keywordId" });
Keyword.belongsToMany(Job, { through: JobKeyword, foreignKey: "keywordId", otherKey: "jobId" });

User.belongsToMany(Job, { through: UserJob, foreignKey: "userId", otherKey: "jobId" });
Job.belongsToMany(User, { through: UserJob, foreignKey: "jobId", otherKey: "userId" });

User.belongsToMany(Skill, { through: UserSkill, foreignKey: "userId", otherKey: "skillId" });
Skill.belongsToMany(User, { through: UserSkill, foreignKey: "skillId", otherKey: "userId" });

User.belongsToMany(Exclusion, {
  through: UserExclusion,
  foreignKey: "userId",
  otherKey: "exclusionId",
});
Exclusion.belongsToMany(User, {
  through: UserExclusion,
  foreignKey: "exclusionId",
  otherKey: "userId",
});

export {
  Job,
  JobDescription,
  CoverLetter,
  Keyword,
  User,
  Skill,
  Exclusion,
  JobKeyword,
  UserJob,
  UserSkill,
  UserExclusion,
};
