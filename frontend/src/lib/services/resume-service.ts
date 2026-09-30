import { createClient } from "@/lib/supabase/client";

export async function uploadResumeFile(userId: string, file: File) {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniqueName = `${Date.now()}_${cleanFileName}`;
  const filePath = `${userId}/${uniqueName}`;

  // 1. Upload to private resumes bucket
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return { data: null, error: uploadError };
  }

  return { data: { filePath, fileName: file.name, fileSize: file.size, fileType: file.type || fileExt }, error: null };
}

export async function getResumeSignedUrl(filePath: string, expiresInSeconds: number = 3600) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("resumes")
    .createSignedUrl(filePath, expiresInSeconds);

  return { signedUrl: data?.signedUrl || null, error };
}

export async function saveResumeAnalysis(
  userId: string,
  resumeData: {
    fileName: string;
    filePath: string;
    fileType?: string;
    fileSize?: number;
    parsedText?: string;
    parsedData?: any;
    atsScore?: number; // SkillForge ATS Compatibility Score
    atsBreakdown?: any;
  }
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("resumes")
    .insert([
      {
        user_id: userId,
        file_name: resumeData.fileName,
        file_path: resumeData.filePath,
        file_type: resumeData.fileType,
        file_size: resumeData.fileSize,
        parsed_text: resumeData.parsedText,
        parsed_data: resumeData.parsedData || {},
        ats_score: resumeData.atsScore,
        ats_breakdown: resumeData.atsBreakdown || {},
        status: "analyzed",
      },
    ])
    .select()
    .single();

  return { data, error };
}

export async function getUserResumes(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data: data || [], error };
}
