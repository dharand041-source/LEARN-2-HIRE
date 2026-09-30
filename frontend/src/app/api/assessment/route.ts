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

    const { data: attempts, error } = await supabase
      .from("assessment_attempts")
      .select("*, assessment_skill_results(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ attempts });
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
    const { role, assessment_type, score, total_questions, correct_answers, skill_breakdowns } = body;

    const { data: attempt, error: attemptError } = await supabase
      .from("assessment_attempts")
      .insert([
        {
          user_id: user.id,
          role,
          assessment_type: assessment_type || "initial",
          score,
          total_questions,
          correct_answers,
          status: "completed",
          completed_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (attemptError) {
      return NextResponse.json({ error: attemptError.message }, { status: 500 });
    }

    if (skill_breakdowns && Array.isArray(skill_breakdowns) && skill_breakdowns.length > 0) {
      const skillRows = skill_breakdowns.map((sb: any) => ({
        attempt_id: attempt.id,
        user_id: user.id,
        skill: sb.skill,
        questions_attempted: sb.questions_attempted || 0,
        correct_answers: sb.correct_answers || 0,
        score: sb.score || 0,
        skill_band: sb.skill_band || (sb.score >= 80 ? "Proficient" : sb.score >= 60 ? "Intermediate" : "Developing"),
      }));

      await supabase.from("assessment_skill_results").insert(skillRows);
    }

    return NextResponse.json({ attempt });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
