import { createClient } from "@/lib/supabase/client";

export async function getLearningCourses(role?: string) {
  const supabase = createClient();
  let query = supabase
    .from("learning_courses")
    .select("*, learning_lessons(*)")
    .eq("is_active", true);

  if (role) {
    query = query.ilike("role", `%${role}%`);
  }

  const { data, error } = await query;
  return { data: data || [], error };
}

export async function getUserLearningProgress(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("learning_progress")
    .select("*")
    .eq("user_id", userId);

  return { data: data || [], error };
}

export async function updateLearningLessonProgress(
  userId: string,
  courseId: string,
  lessonId: string,
  progressPercentage: number,
  status: "in_progress" | "completed"
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("learning_progress")
    .upsert(
      {
        user_id: userId,
        course_id: courseId,
        lesson_id: lessonId,
        progress_percentage: progressPercentage,
        status,
        completed_at: status === "completed" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    )
    .select()
    .single();

  return { data, error };
}
