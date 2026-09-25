import { JobListing, JobSearchQuery } from "@/types";

export interface SourceFetchResult {
  source: string;
  success: boolean;
  jobs: JobListing[];
  error?: string;
  lastFetchedAt: string;
}

export interface JobSourceAdapter {
  name: string;
  searchJobs(query: JobSearchQuery): Promise<SourceFetchResult>;
}
