import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const opportunityType = searchParams.get("type");
    const remoteType = searchParams.get("remote");
    const queryParam = searchParams.get("q");

    const supabase = await createClient();
    let query = supabase
      .from("job_listings")
      .select("*")
      .eq("is_active", true)
      .order("posted_at", { ascending: false });

    if (opportunityType && opportunityType !== "All") {
      query = query.eq("opportunity_type", opportunityType);
    }
    if (remoteType && remoteType !== "All") {
      query = query.eq("remote_type", remoteType);
    }
    if (queryParam) {
      query = query.or(`title.ilike.%${queryParam}%,company.ilike.%${queryParam}%`);
    }

    const { data: jobs, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ jobs: jobs || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
