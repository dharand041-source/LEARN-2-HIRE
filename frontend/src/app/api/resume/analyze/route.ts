import { NextRequest, NextResponse } from "next/server";
import { extractRawTextFromFile, parseResumeText } from "@/services/resumeParser";
import { analyzeResumeATS } from "@/services/atsScorer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let rawText = "";
    let targetRole = "Full Stack Developer";

    let jobDescription: string | undefined = undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const roleField = formData.get("targetRole") as string | null;
      const jdField = formData.get("jobDescription") as string | null;

      if (roleField) targetRole = roleField;
      if (jdField) jobDescription = jdField;

      if (!file) {
        return NextResponse.json(
          { success: false, error: "No resume file uploaded." },
          { status: 400 }
        );
      }

      // File size validation (Max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "File size exceeds 5MB limit. Please upload a smaller file." },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      if (buffer.length === 0) {
        return NextResponse.json(
          { success: false, error: "Uploaded file is empty." },
          { status: 400 }
        );
      }

      rawText = await extractRawTextFromFile(buffer, file.name, file.type);
    } else {
      const body = await req.json();
      if (!body.text || body.text.trim().length === 0) {
        return NextResponse.json(
          { success: false, error: "Missing resume text in request body." },
          { status: 400 }
        );
      }
      rawText = body.text;
      if (body.targetRole) targetRole = body.targetRole;
      if (body.jobDescription) jobDescription = body.jobDescription;
    }

    if (rawText.trim().length < 50) {
      return NextResponse.json(
        {
          success: false,
          error: "Extracted resume content is too brief to analyze. Please provide a complete resume document.",
        },
        { status: 400 }
      );
    }

    // Parse and score
    const parsedResume = parseResumeText(rawText);
    const analysis = analyzeResumeATS(parsedResume, targetRole, jobDescription);

    return NextResponse.json({
      success: true,
      parsedResume,
      analysis,
    });
  } catch (err: any) {
    console.error("Resume analyze route error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to analyze resume document.",
      },
      { status: 500 }
    );
  }
}
