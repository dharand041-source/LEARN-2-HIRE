import { JobListing, JobSearchQuery } from "@/types";
import { JobSourceAdapter, SourceFetchResult } from "./types";
import { JobicyAdapter } from "./jobicyAdapter";
import { RemotiveAdapter } from "./remotiveAdapter";
import { AdzunaAdapter } from "./adzunaAdapter";
import { StartupJobsAdapter, InternshipAdapter } from "./curatedVerifiedAdapters";

export interface AggregatedJobsResponse {
  jobs: JobListing[];
  sources: {
    source: string;
    success: boolean;
    error?: string;
    jobCount: number;
    lastFetchedAt: string;
  }[];
  totalFound: number;
}

export class JobAggregator {
  private adapters: JobSourceAdapter[];

  constructor() {
    this.adapters = [
      new JobicyAdapter(),
      new RemotiveAdapter(),
      new AdzunaAdapter(),
      new StartupJobsAdapter(),
      new InternshipAdapter(),
    ];
  }

  /**
   * Normalizes company name for deduplication
   */
  private normalizeCompany(company: string): string {
    return company
      .toLowerCase()
      .replace(/\b(inc|ltd|pvt|llc|technologies|solutions|labs|corporation|corp)\b/gi, "")
      .replace(/[^\w]/g, "")
      .trim();
  }

  /**
   * Normalizes job title for deduplication
   */
  private normalizeTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/\b(senior|junior|lead|staff|principal|intern|trainee)\b/gi, "")
      .replace(/[^\w]/g, "")
      .trim();
  }

  /**
   * Validates application and listing URLs
   */
  private isSecureUrl(url: string | undefined): boolean {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:";
    } catch {
      return false;
    }
  }

  /**
   * Queries all permitted sources, deduplicates, and validates URLs
   */
  async searchAllJobs(query: JobSearchQuery): Promise<AggregatedJobsResponse> {
    const results = await Promise.allSettled(
      this.adapters.map((adapter) => adapter.searchJobs(query))
    );

    const allJobs: JobListing[] = [];
    const sourceStatus: AggregatedJobsResponse["sources"] = [];

    results.forEach((res, idx) => {
      const adapterName = this.adapters[idx].name;
      if (res.status === "fulfilled") {
        const val = res.value;
        sourceStatus.push({
          source: val.source,
          success: val.success,
          error: val.error,
          jobCount: val.jobs.length,
          lastFetchedAt: val.lastFetchedAt,
        });
        if (val.success && Array.isArray(val.jobs)) {
          allJobs.push(...val.jobs);
        }
      } else {
        sourceStatus.push({
          source: adapterName,
          success: false,
          error: res.reason?.message || "Source timeout or network failure",
          jobCount: 0,
          lastFetchedAt: new Date().toISOString(),
        });
      }
    });

    // Deduplication step
    const dedupedMap = new Map<string, JobListing>();

    for (const job of allJobs) {
      // Validate secure URL
      if (!this.isSecureUrl(job.listingUrl)) {
        continue;
      }
      if (job.applicationUrl && !this.isSecureUrl(job.applicationUrl)) {
        job.applicationUrl = job.listingUrl;
      }

      // Check expiry / active
      if (!job.isActive) continue;

      const normComp = this.normalizeCompany(job.company);
      const normTitle = this.normalizeTitle(job.title);
      const dedupKey = `${normComp}:${normTitle}`;

      if (dedupedMap.has(dedupKey)) {
        const existing = dedupedMap.get(dedupKey)!;
        if (!existing.alsoFoundOn) existing.alsoFoundOn = [];
        if (!existing.alsoFoundOn.includes(job.source)) {
          existing.alsoFoundOn.push(job.source);
        }
      } else {
        dedupedMap.set(dedupKey, { ...job });
      }
    }

    let finalJobs = Array.from(dedupedMap.values());

    // Apply opportunity type filter
    if (query.type && query.type !== "all") {
      finalJobs = finalJobs.filter((j) => j.opportunityType === query.type);
    }

    // Apply work mode filter
    if (query.workMode && query.workMode !== "all") {
      finalJobs = finalJobs.filter(
        (j) => j.remoteType.toLowerCase() === query.workMode!.toLowerCase()
      );
    }

    return {
      jobs: finalJobs,
      sources: sourceStatus,
      totalFound: finalJobs.length,
    };
  }
}
