import { JobListing, JobSearchQuery } from "@/types";
import { JobSourceAdapter, SourceFetchResult } from "./types";
import { extractSkillsFromText } from "../resumeParser";

export class AdzunaAdapter implements JobSourceAdapter {
  name = "adzuna";

  async searchJobs(query: JobSearchQuery): Promise<SourceFetchResult> {
    const lastFetchedAt = new Date().toISOString();
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    // Graceful skip if credentials are not configured in environment
    if (!appId || !appKey) {
      return {
        source: this.name,
        success: true,
        jobs: [],
        error: "Adzuna credentials not configured (server-side ADZUNA_APP_ID / ADZUNA_APP_KEY).",
        lastFetchedAt,
      };
    }

    try {
      const country = "in"; // default to India or gb/us
      const what = encodeURIComponent(query.role || "software engineer");
      const where = query.location ? encodeURIComponent(query.location) : "india";
      const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=20&what=${what}&where=${where}&content-type=application/json`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Adzuna API returned status: ${res.status}`);
      }

      const data = await res.json();
      const rawResults = Array.isArray(data.results) ? data.results : [];

      const jobs: JobListing[] = rawResults.map((item: any) => {
        const desc = (item.description || "").replace(/<[^>]*>?/gm, "").trim();
        const extracted = extractSkillsFromText(item.title + " " + desc);

        const safeUrl = (item.redirect_url && item.redirect_url.startsWith("https://"))
          ? item.redirect_url
          : "https://www.adzuna.com";

        return {
          id: `adzuna-${item.id}`,
          source: "adzuna",
          sourceId: String(item.id),
          title: item.title || "Software Developer",
          company: item.company?.display_name || "Enterprise Employer",
          description: desc.slice(0, 350) + (desc.length > 350 ? "..." : ""),
          location: item.location?.display_name || "India",
          country: "India",
          remoteType: desc.toLowerCase().includes("remote") ? "Remote" : "Hybrid",
          employmentType: "Full-time",
          opportunityType: item.title?.toLowerCase().includes("intern") ? "INTERNSHIP" : "JOB",
          experienceLevel: "Entry Level",
          requiredSkills: extracted.technicalSkills.length > 0 ? extracted.technicalSkills.slice(0, 8) : ["SQL", "Java"],
          preferredSkills: [],
          salaryMin: item.salary_min ? Math.round(item.salary_min) : undefined,
          salaryMax: item.salary_max ? Math.round(item.salary_max) : undefined,
          salaryCurrency: "INR",
          postedAt: item.created ? new Date(item.created).toISOString() : new Date().toISOString(),
          lastVerifiedAt: new Date().toISOString(),
          listingUrl: safeUrl,
          applicationUrl: safeUrl,
          sourceUrl: safeUrl,
          isActive: true,
          attribution: "Source: Adzuna Job Search",
        };
      });

      return {
        source: this.name,
        success: true,
        jobs,
        lastFetchedAt,
      };
    } catch (err: any) {
      console.warn("AdzunaAdapter error:", err.message);
      return {
        source: this.name,
        success: false,
        jobs: [],
        error: err.message,
        lastFetchedAt,
      };
    }
  }
}
