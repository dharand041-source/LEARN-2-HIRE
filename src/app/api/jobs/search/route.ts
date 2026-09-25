import { NextRequest, NextResponse } from "next/server";
import { JobAggregator } from "@/services/jobSources/aggregator";
import { JobSearchQuery, OpportunityType, WorkMode } from "@/types";

export const dynamic = "force-dynamic";

const aggregator = new JobAggregator();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const role = searchParams.get("role") || undefined;
    const location = searchParams.get("location") || undefined;
    const workMode = (searchParams.get("workMode") as WorkMode) || undefined;
    const type = (searchParams.get("type") as OpportunityType) || undefined;
    const skillsParam = searchParams.get("skills");
    const skills = skillsParam ? skillsParam.split(",").map((s) => s.trim()).filter(Boolean) : undefined;

    const query: JobSearchQuery = {
      role,
      location,
      workMode,
      type,
      skills,
    };

    const response = await aggregator.searchAllJobs(query);

    return NextResponse.json({
      success: true,
      total: response.totalFound,
      jobs: response.jobs,
      sources: response.sources,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Job search API error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to search job opportunities.",
        jobs: [],
        sources: [],
      },
      { status: 500 }
    );
  }
}
