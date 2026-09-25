import { JobListing, JobSearchQuery, OpportunityType } from "@/types";
import { JobSourceAdapter, SourceFetchResult } from "./types";
import { extractSkillsFromText } from "../resumeParser";

// In-memory cache to prevent hammering the Jobicy API
let cache: { timestamp: number; jobs: JobListing[] } | null = null;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export class JobicyAdapter implements JobSourceAdapter {
  name = "jobicy";

  async searchJobs(query: JobSearchQuery): Promise<SourceFetchResult> {
    const now = Date.now();
    const lastFetchedAt = new Date().toISOString();

    try {
      // Check cache if within TTL
      if (cache && now - cache.timestamp < CACHE_TTL_MS) {
        const filtered = this.filterJobs(cache.jobs, query);
        return {
          source: this.name,
          success: true,
          jobs: filtered,
          lastFetchedAt,
        };
      }

      // Fetch from Jobicy public API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const url = "https://jobicy.com/api/v2/remote-jobs?count=30";
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "SkillForge-Career-Engine/1.0",
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Jobicy API returned status: ${res.status}`);
      }

      const data = await res.json();
      const rawJobs = Array.isArray(data.jobs) ? data.jobs : [];

      const normalizedJobs: JobListing[] = rawJobs.map((item: any) => {
        const description = (item.jobExcerpt || item.jobDescription || "").replace(/<[^>]*>?/gm, "").trim();
        const extracted = extractSkillsFromText(item.jobTitle + " " + description);

        // Detect opportunity type
        let opportunityType: OpportunityType = "JOB";
        const titleLower = (item.jobTitle || "").toLowerCase();
        const typeLower = (item.jobType || []).join(" ").toLowerCase();
        const companyLower = (item.companyName || "").toLowerCase();

        if (titleLower.includes("intern") || typeLower.includes("intern")) {
          opportunityType = "INTERNSHIP";
        } else if (
          companyLower.includes("labs") ||
          companyLower.includes("ai") ||
          description.toLowerCase().includes("seed") ||
          description.toLowerCase().includes("series a") ||
          description.toLowerCase().includes("startup")
        ) {
          opportunityType = "STARTUP";
        }

        // Validate secure HTTPS URL
        const safeUrl = (item.url && item.url.startsWith("https://")) ? item.url : "https://jobicy.com";

        return {
          id: `jobicy-${item.id}`,
          source: "jobicy",
          sourceId: String(item.id),
          title: item.jobTitle || "Software Engineer",
          company: item.companyName || "Global Technology Employer",
          companyLogo: item.companyLogo || undefined,
          description: description.slice(0, 350) + (description.length > 350 ? "..." : ""),
          location: item.jobGeo || "Worldwide / Remote",
          country: item.jobGeo || "Worldwide",
          remoteType: "Remote",
          employmentType: (item.jobType && item.jobType[0]) ? item.jobType[0] : "Full-time",
          opportunityType,
          experienceLevel: titleLower.includes("senior") ? "5+ years" : titleLower.includes("junior") ? "1-2 years" : "Fresher",
          requiredSkills: extracted.technicalSkills.length > 0 ? extracted.technicalSkills.slice(0, 8) : ["JavaScript", "Git"],
          preferredSkills: [],
          salaryMin: item.annualSalaryMin ? Number(item.annualSalaryMin) : undefined,
          salaryMax: item.annualSalaryMax ? Number(item.annualSalaryMax) : undefined,
          salaryCurrency: item.salaryCurrency || undefined,
          postedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
          lastVerifiedAt: new Date().toISOString(),
          listingUrl: safeUrl,
          applicationUrl: safeUrl, // Jobicy provides canonical application destination
          sourceUrl: safeUrl,
          isActive: true,
          attribution: "Source: Jobicy Remote Jobs",
        };
      });

      // Update cache
      cache = { timestamp: now, jobs: normalizedJobs };

      const filtered = this.filterJobs(normalizedJobs, query);
      return {
        source: this.name,
        success: true,
        jobs: filtered,
        lastFetchedAt,
      };
    } catch (err: any) {
      console.warn("JobicyAdapter fetch error:", err.message);
      // Return cached fallback if available
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
