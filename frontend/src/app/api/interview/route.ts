import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: sessions, error } = await supabase
      .from("interview_sessions")
      .select("*, interview_answers(*)")
      .eq("user_id", user.id)
      .order("conducted_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ sessions: sessions || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      role_id,
      role_title,
      interview_type,
      duration_minutes,
      overall_score,
      technical_score,
      communication_score,
      problem_solving_score,
      answer_structure_score,
      summary_feedback,
      what_went_well,
      what_to_improve,
      recommended_practice,
      answers,
    } = body;

    const { data: sessionData, error: sessionError } = await supabase
      .from("interview_sessions")
      .insert([
        {
          user_id: user.id,
          role_id,
          role_title,
          interview_type: interview_type || "Technical Interview",
          duration_minutes: duration_minutes || 0,
          overall_score: overall_score || 0,
          technical_score: technical_score || 0,
          communication_score: communication_score || 0,
          problem_solving_score: problem_solving_score || 0,
          answer_structure_score: answer_structure_score || 0,
          summary_feedback: summary_feedback || {},
          what_went_well: what_went_well || [],
          what_to_improve: what_to_improve || [],
          recommended_practice: recommended_practice || [],
        },
      ])
      .select()
      .single();

    if (sessionError) {
      return NextResponse.json({ error: sessionError.message }, { status: 500 });
    }

    if (answers && Array.isArray(answers) && answers.length > 0) {
      const answerRows = answers.map((ans: any) => ({
        session_id: sessionData.id,
        user_id: user.id,
        question_text: ans.question_text,
        answer_transcript: ans.answer_transcript || "",
        feedback: ans.feedback || "",
        score: ans.score || 0,
        ideal_points: ans.ideal_points || [],
      }));

      await supabase.from("interview_answers").insert(answerRows);
    }

    return NextResponse.json({ session: sessionData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
