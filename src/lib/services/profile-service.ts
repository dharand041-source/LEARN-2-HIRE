import { createClient } from "@/lib/supabase/client";

export interface ProfileData {
  id?: string;
  full_name?: string;
  username?: string;
  email?: string;
  avatar_url?: string;
  phone?: string;
  location?: string;
  bio?: string;
  headline?: string;
  website_url?: string;
  linkedin_url?: string;
  github_url?: string;
  selected_role?: string;
  experience_level?: string;
  education?: string;
  graduation_year?: number;
  preferred_location?: string;
  preferred_work_mode?: string;
}

export async function getProfile(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching profile:", error.message);
  }
  return { data, error };
}

export async function updateProfile(userId: string, updates: Partial<ProfileData>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();

  return { data, error };
}

export async function getUserSkills(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_skills")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data: data || [], error };
}

export async function addUserSkill(
  userId: string,
  skill: {
    skill_name: string;
    normalized_skill?: string;
    skill_category?: string;
    skill_level?: number;
    source?: "resume" | "assessment" | "manual" | "project" | "interview";
    verified?: boolean;
    assessment_score?: number;
  }
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_skills")
    .insert([{ ...skill, user_id: userId }])
    .select()
    .single();

  return { data, error };
}

export async function getUserPreferences(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  return { data, error };
}

export async function updateUserPreferences(userId: string, preferences: any) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_preferences")
    .upsert(
      { user_id: userId, ...preferences, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  return { data, error };
}
