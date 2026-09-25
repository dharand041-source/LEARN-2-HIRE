import { createClient } from "@/lib/supabase/client";

export async function saveInterviewSession(
  userId: string,
  session: {
    role_id?: string;
    role_title?: string;
    interview_type: string;
    duration_minutes?: number;
    overall_score: number;
    technical_score?: number;
    communication_score?: number;
    problem_solving_score?: number;
    answer_structure_score?: number;
    summary_feedback?: any;
    what_went_well?: string[];
    what_to_improve?: string[];
    recommended_practice?: string[];
    answers?: {
      question_text: string;
      answer_transcript?: string;
      feedback?: string;
      score?: number;
      ideal_points?: string[];
    }[];
  }
) {
  const supabase = createClient();

  // 1. Insert session record
  const { data: sessionData, error: sessionError } = await supabase
    .from("interview_sessions")
    .insert([
      {
        user_id: userId,
        role_id: session.role_id,
        role_title: session.role_title,
        interview_type: session.interview_type,
        duration_minutes: session.duration_minutes || 0,
        overall_score: session.overall_score,
        technical_score: session.technical_score || 0,
        communication_score: session.communication_score || 0,
        problem_solving_score: session.problem_solving_score || 0,
        answer_structure_score: session.answer_structure_score || 0,
        summary_feedback: session.summary_feedback || {},
        what_went_well: session.what_went_well || [],
        what_to_improve: session.what_to_improve || [],
        recommended_practice: session.recommended_practice || [],
      },
    ])
    .select()
    .single();

  if (sessionError) return { data: null, error: sessionError };

  // 2. Insert interview answers if present
  if (session.answers && session.answers.length > 0) {
    const answerRows = session.answers.map((ans) => ({
      session_id: sessionData.id,
      user_id: userId,
      question_text: ans.question_text,
      answer_transcript: ans.answer_transcript || "",
      feedback: ans.feedback || "",
      score: ans.score || 0,
      ideal_points: ans.ideal_points || [],
    }));

    await supabase.from("interview_answers").insert(answerRows);
  }

  return { data: sessionData, error: null };
}

export async function getUserInterviewSessions(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("interview_sessions")
    .select("*, interview_answers(*)")
    .eq("user_id", userId)
    .order("conducted_at", { ascending: false });

  return { data: data || [], error };
}
