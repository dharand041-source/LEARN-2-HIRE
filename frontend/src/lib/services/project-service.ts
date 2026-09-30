import { createClient } from "@/lib/supabase/client";
import { ProjectItem } from "@/types";

export interface DBProject {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  role?: string;
  skills?: string[];
  github_url?: string;
  live_url?: string;
  status: "Not Started" | "In Progress" | "Under Review" | "Completed";
  score?: number;
  evaluation?: any;
  created_at?: string;
  updated_at?: string;
}

export async function getUserProjects(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  return { data: (data as DBProject[]) || [], error };
}

export async function saveUserProject(
  userId: string,
  project: {
    id?: string;
    title: string;
    description?: string;
    role?: string;
    skills?: string[];
    github_url?: string;
    live_url?: string;
    status: "Not Started" | "In Progress" | "Under Review" | "Completed";
    score?: number;
    evaluation?: any;
  }
) {
  const supabase = createClient();
  const payload: any = {
    user_id: userId,
    title: project.title,
    description: project.description || "",
    role: project.role || "",
    skills: project.skills || [],
    github_url: project.github_url || null,
    live_url: project.live_url || null,
    status: project.status,
    score: project.score || null,
    evaluation: project.evaluation || {},
    updated_at: new Date().toISOString(),
  };

  if (project.id && !project.id.startsWith("proj-")) {
    // Valid DB UUID
    payload.id = project.id;
  }

  const { data, error } = await supabase
    .from("projects")
    .upsert(payload)
    .select()
    .single();

  return { data, error };
}
