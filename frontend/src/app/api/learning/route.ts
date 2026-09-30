import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    const supabase = await createClient();
    let query = supabase
      .from("learning_courses")
      .select("*, learning_lessons(*)")
      .eq("is_active", true);

    if (role) {
      query = query.ilike("role", `%${role}%`);
    }

    const { data: courses, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ courses: courses || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
