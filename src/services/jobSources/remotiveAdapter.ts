import { JobListing, JobSearchQuery, OpportunityType } from "@/types";
import { JobSourceAdapter, SourceFetchResult } from "./types";
import { extractSkillsFromText } from "../resumeParser";

let cache: { timestamp: number; jobs: JobListing[] } | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

export class RemotiveAdapter implements JobSourceAdapter {
  name = "remotive";

  async searchJobs(query: JobSearchQuery): Promise<SourceFetchResult> {
    const now = Date.now();
    const lastFetchedAt = new Date().toISOString();

    try {
      if (cache && now - cache.timestamp < CACHE_TTL_MS) {
        return {
          source: this.name,
          success: true,
          jobs: this.filterJobs(cache.jobs, query),
          lastFetchedAt,
        };
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const searchParam = query.role ? encodeURIComponent(query.role) : "developer";
      const url = `https://remotive.com/remote-jobs/api?search=${searchParam}&limit=25`;

      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "SkillForge-Career-Engine/1.0",
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Remotive API returned status: ${res.status}`);
      }

      const data = await res.json();
      const rawJobs = Array.isArray(data.jobs) ? data.jobs : [];

      const normalizedJobs: JobListing[] = rawJobs.map((item: any) => {
        const plainDesc = (item.description || "").replace(/<[^>]*>?/gm, "").trim();
        const extracted = extractSkillsFromText(item.title + " " + plainDesc);

        let opportunityType: OpportunityType = "JOB";
        const titleLower = (item.title || "").toLowerCase();
        const typeLower = (item.job_type || "").toLowerCase();

        if (titleLower.includes("intern") || typeLower.includes("intern")) {
          opportunityType = "INTERNSHIP";
        } else if (
          item.company_name?.toLowerCase().includes("tech") ||
          plainDesc.toLowerCase().includes("seed") ||
          plainDesc.toLowerCase().includes("early stage") ||
          plainDesc.toLowerCase().includes("series a")
        ) {
          opportunityType = "STARTUP";
        }

        const safeUrl = (item.url && item.url.startsWith("https://")) ? item.url : "https://remotive.com";

        return {
          id: `remotive-${item.id}`,
          source: "remotive",
          sourceId: String(item.id),
          title: item.title || "Software Engineer",
          company: item.company_name || "Verified Tech Company",
          companyLogo: item.company_logo || undefined,
          description: plainDesc.slice(0, 350) + (plainDesc.length > 350 ? "..." : ""),
          location: item.candidate_required_location || "Worldwide / Remote",
          country: item.candidate_required_location || "Worldwide",
          remoteType: "Remote",
          employmentType: item.job_type === "full_time" ? "Full-time" : "Contract",
          opportunityType,
          experienceLevel: titleLower.includes("senior") ? "5+ years" : titleLower.includes("junior") ? "1-2 years" : "Fresher",
          requiredSkills: extracted.technicalSkills.length > 0 ? extracted.technicalSkills.slice(0, 8) : ["TypeScript", "React"],
          preferredSkills: [],
          salaryMin: undefined,
          salaryMax: undefined,
          salaryCurrency: undefined,
          postedAt: item.publication_date ? new Date(item.publication_date).toISOString() : new Date().toISOString(),
          lastVerifiedAt: new Date().toISOString(),
          listingUrl: safeUrl,
          applicationUrl: safeUrl, // Remotive requires link-back directly to the Remotive listing
          sourceUrl: safeUrl,
          isActive: true,
          attribution: "Source: Remotive (Public API - 24hr freshness limitation)",
        };
      });

      cache = { timestamp: now, jobs: normalizedJobs };

      return {
        source: this.name,
        success: true,
        jobs: this.filterJobs(normalizedJobs, query),
        lastFetchedAt,
      };
    } catch (err: any) {
      console.warn("RemotiveAdapter fetch error:", err.message);
      if (cache) {
        return {
          source: this.name,
          success: true,
          jobs: this.filterJobs(cache.jobs, query),
          lastFetchedAt,
        };
      }
      return {
        source: this.name,
        success: false,
        jobs: [],
        error: err.message,
        lastFetchedAt,
      };
    }
  }

  private filterJobs(jobs: JobListing[], query: JobSearchQuery): JobListing[] {
    let result = jobs;
    if (query.role) {
      const q = query.role.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.requiredSkills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (query.type && query.type !== "all") {
      result = result.filter((j) => j.opportunityType === query.type);
    }
    return result;
  }
}
