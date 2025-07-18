import { IJobResult } from "./types.js";

export interface Summary {
  created: number;
  existed: number;
  failed: number;
  descriptionCreated: number;
}

export const summarizeResults = (results: IJobResult[]): Summary => {
  return results.reduce(
    (acc, result) => {
      if (result.created) acc.created++;
      if (result.existed) acc.existed++;
      if (result.failed) acc.failed++;
      if (result.descriptionCreated) acc.descriptionCreated++;
      return acc;
    },
    { created: 0, existed: 0, failed: 0, descriptionCreated: 0 }
  );
};

export const formatSummary = (
  summary: Summary,
  jobs: { total?: number; filteredJobs?: number }
): string => {
  return `\nCreated ${summary.created} jobs out of ${jobs.filteredJobs} that were filtered out of ${jobs.total} total.\n${summary.existed} already existed.\n${summary.failed} failed to create.\nJob descriptions created: ${summary.descriptionCreated}.`;
};

