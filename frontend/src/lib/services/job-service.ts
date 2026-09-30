import { createClient } from "@/lib/supabase/client";

export interface JobFilter {
  opportunityType?: string;
  remoteType?: string;
  query?: string;
}

export async function getJobListings(filters?: JobFilter) {
  const supabase = createClient();
  let query = supabase
    .from("job_listings")
    .select("*")
    .eq("is_active", true)
    .order("posted_at", { ascending: false });

  if (filters?.opportunityType && filters.opportunityType !== "All") {
    query = query.eq("opportunity_type", filters.opportunityType);
  }

  if (filters?.remoteType && filters.remoteType !== "All") {
    query = query.eq("remote_type", filters.remoteType);
  }

  if (filters?.query) {
    query = query.or(`title.ilike.%${filters.query}%,company.ilike.%${filters.query}%`);
  }

  const { data, error } = await query;
  return { data: data || [], error };
}

export async function getSavedJobs(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job_listings(*)")
    .eq("user_id", userId);

  return { data: data || [], error };
}

export async function toggleSaveJob(userId: string, jobId: string, isSaved: boolean) {
  const supabase = createClient();
  if (isSaved) {
    const { error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("user_id", userId)
      .eq("job_id", jobId);
    return { saved: false, error };
  } else {
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert([{ user_id: userId, job_id: jobId }])
      .select()
      .single();
    return { saved: true, data, error };
  }
}

export async function getJobMatches(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("job_matches")
    .select("*, job_listings(*)")
    .eq("user_id", userId)
    .order("match_score", { ascending: false });

  return { data: data || [], error };
}
