import { createClient } from "@/lib/supabase/client";

export async function createAssessmentAttempt(
  userId: string,
  role: string,
  assessmentType: "initial" | "advanced" | "aptitude" | "logical_reasoning"
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("assessment_attempts")
    .insert([
      {
        user_id: userId,
        role,
        assessment_type: assessmentType,
        status: "in_progress",
        started_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  return { data, error };
}

export async function recordAssessmentAnswer(
  attemptId: string,
  answer: {
    question_id: string;
    role?: string;
    skill?: string;
    question_type?: string;
    selected_answer?: string;
    correct_answer?: string;
    is_correct?: boolean;
    time_taken_seconds?: number;
  }
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("assessment_answers")
    .insert([
      {
        attempt_id: attemptId,
        ...answer,
      },
    ])
    .select()
    .single();

  return { data, error };
}

export async function completeAssessmentAttempt(
  attemptId: string,
  userId: string,
  summary: {
    score: number;
    total_questions: number;
    correct_answers: number;
    skillBreakdowns?: {
      skill: string;
      questions_attempted: number;
      correct_answers: number;
      score: number;
      skill_band?: string;
    }[];
  }
) {
  const supabase = createClient();

  // 1. Update attempt status & score
  const { data: attempt, error: attemptError } = await supabase
    .from("assessment_attempts")
    .update({
      score: summary.score,
      total_questions: summary.total_questions,
      correct_answers: summary.correct_answers,
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", attemptId)
    .select()
    .single();

  if (attemptError) return { data: null, error: attemptError };

  // 2. Insert skill breakdown if present
  if (summary.skillBreakdowns && summary.skillBreakdowns.length > 0) {
    const skillRows = summary.skillBreakdowns.map((sb) => ({
      attempt_id: attemptId,
      user_id: userId,
      skill: sb.skill,
      questions_attempted: sb.questions_attempted,
      correct_answers: sb.correct_answers,
      score: sb.score,
      skill_band: sb.skill_band || (sb.score >= 80 ? "Proficient" : sb.score >= 60 ? "Intermediate" : "Developing"),
    }));

    await supabase.from("assessment_skill_results").insert(skillRows);
  }

  return { data: attempt, error: null };
}

export async function getUserAssessmentHistory(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("assessment_attempts")
    .select("*, assessment_skill_results(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data: data || [], error };
}
