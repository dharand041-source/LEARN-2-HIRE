import { createClient } from "@/lib/supabase/client";

export async function getUserApplications(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("applications")
    .select("*, job_listings(*)")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  return { data: data || [], error };
}

export async function trackJobRedirection(userId: string, jobId: string, externalUrl?: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        user_id: userId,
        job_id: jobId,
        external_url: externalUrl,
        status: "redirected",
        redirected_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  return { data, error };
}

export async function updateApplicationStatus(
  userId: string,
  applicationId: string,
  status: "saved" | "viewed" | "redirected" | "applied" | "interview" | "rejected" | "offer" | "unknown",
  notes?: string
) {
  const supabase = createClient();
  const updates: any = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (status === "applied") {
    updates.applied_at = new Date().toISOString();
  }
  if (notes !== undefined) {
    updates.notes = notes;
  }

  const { data, error } = await supabase
    .from("applications")
    .update(updates)
    .eq("id", applicationId)
    .eq("user_id", userId)
    .select()
    .single();

  return { data, error };
}
