-- ==============================================================================
-- SkillForge Database & Storage Master Migration Script
-- Supabase PostgreSQL Engine
-- ==============================================================================

-- Enable UUID & Crypto extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. PROFILES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  username TEXT UNIQUE,
  email TEXT,
  avatar_url TEXT,
  phone TEXT,
  location TEXT,
  bio TEXT,
  headline TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  selected_role TEXT DEFAULT 'Full Stack Developer',
  experience_level TEXT DEFAULT 'Entry Level',
  education TEXT,
  graduation_year INTEGER,
  preferred_location TEXT,
  preferred_work_mode TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 2. USER SKILLS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  normalized_skill TEXT,
  skill_category TEXT,
  skill_level NUMERIC DEFAULT 1.0,
  source TEXT DEFAULT 'manual', -- 'resume', 'assessment', 'manual', 'project', 'interview'
  verified BOOLEAN DEFAULT false,
  assessment_score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 3. ASSESSMENTS & ATTEMPTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  assessment_type TEXT NOT NULL, -- 'initial', 'advanced', 'aptitude', 'logical_reasoning'
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  total_questions INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  score NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed', 'abandoned'
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assessment_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES public.assessment_attempts(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  role TEXT,
  skill TEXT,
  question_type TEXT DEFAULT 'MCQ', -- 'MCQ', 'Fill-in-the-blank'
  selected_answer TEXT,
  correct_answer TEXT,
  is_correct BOOLEAN,
  time_taken_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assessment_skill_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES public.assessment_attempts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  questions_attempted INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  score NUMERIC DEFAULT 0,
  skill_band TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 4. QUESTIONS BANK
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  role TEXT,
  skill TEXT,
  sub_skill TEXT,
  topic TEXT,
  difficulty TEXT DEFAULT 'Intermediate',
  question_type TEXT DEFAULT 'MCQ', -- 'MCQ', 'Fill-in-the-blank'
  question TEXT NOT NULL,
  options JSONB DEFAULT '[]'::jsonb,
  correct_answer TEXT,
  accepted_answers JSONB DEFAULT '[]'::jsonb,
  explanation TEXT,
  source TEXT,
  source_url TEXT,
  version TEXT DEFAULT '1.0',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 5. LEARNING COURSES, LESSONS, AND PROGRESS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.learning_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  role TEXT,
  category TEXT,
  difficulty TEXT DEFAULT 'Foundational',
  estimated_hours NUMERIC DEFAULT 0,
  provider TEXT,
  external_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.learning_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.learning_courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sequence_order INTEGER DEFAULT 1,
  duration_minutes INTEGER DEFAULT 15,
  lesson_type TEXT DEFAULT 'Video', -- 'Video', 'Documentation', 'Exercise', 'Deep Dive'
  video_url TEXT,
  notes_url TEXT,
  practice_exercise JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.learning_courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.learning_lessons(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed'
  progress_percentage NUMERIC DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 6. PROJECTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  role TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  github_url TEXT,
  live_url TEXT,
  status TEXT DEFAULT 'Not Started', -- 'Not Started', 'In Progress', 'Under Review', 'Completed'
  score NUMERIC,
  evaluation JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 7. RESUMES & ATS DATA
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  parsed_text TEXT,
  parsed_data JSONB DEFAULT '{}'::jsonb,
  ats_score NUMERIC,
  ats_breakdown JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'uploaded',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 8. JOB LISTINGS & MATCHES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.job_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT DEFAULT 'direct',
  source_id TEXT,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  location TEXT,
  remote_type TEXT,
  employment_type TEXT,
  opportunity_type TEXT,
  experience_level TEXT,
  required_skills JSONB DEFAULT '[]'::jsonb,
  preferred_skills JSONB DEFAULT '[]'::jsonb,
  salary_min NUMERIC,
  salary_max NUMERIC,
  salary_currency TEXT DEFAULT 'INR',
  posted_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  last_verified_at TIMESTAMPTZ DEFAULT now(),
  listing_url TEXT,
  application_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.job_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.job_listings(id) ON DELETE CASCADE,
  match_score NUMERIC DEFAULT 0,
  eligibility_status TEXT DEFAULT 'Eligible',
  matched_skills JSONB DEFAULT '[]'::jsonb,
  missing_skills JSONB DEFAULT '[]'::jsonb,
  match_reasons JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, job_id)
);

CREATE TABLE IF NOT EXISTS public.saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.job_listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, job_id)
);

CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.job_listings(id) ON DELETE CASCADE,
  external_url TEXT,
  status TEXT DEFAULT 'saved', -- 'saved', 'viewed', 'redirected', 'applied', 'interview', 'rejected', 'offer', 'unknown'
  redirected_at TIMESTAMPTZ,
  applied_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 9. INTERVIEWS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id TEXT,
  role_title TEXT,
  interview_type TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 0,
  overall_score NUMERIC DEFAULT 0,
  technical_score NUMERIC DEFAULT 0,
  communication_score NUMERIC DEFAULT 0,
  problem_solving_score NUMERIC DEFAULT 0,
  answer_structure_score NUMERIC DEFAULT 0,
  summary_feedback JSONB DEFAULT '{}'::jsonb,
  what_went_well JSONB DEFAULT '[]'::jsonb,
  what_to_improve JSONB DEFAULT '[]'::jsonb,
  recommended_practice JSONB DEFAULT '[]'::jsonb,
  conducted_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.interview_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.interview_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  answer_transcript TEXT,
  feedback TEXT,
  score NUMERIC DEFAULT 0,
  ideal_points JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 10. USER PREFERENCES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  language TEXT DEFAULT 'en',
  preferred_roles JSONB DEFAULT '[]'::jsonb,
  preferred_locations JSONB DEFAULT '[]'::jsonb,
  preferred_work_modes JSONB DEFAULT '[]'::jsonb,
  preferred_opportunity_types JSONB DEFAULT '[]'::jsonb,
  salary_min NUMERIC,
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 11. INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_user_skills_user ON public.user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_name ON public.user_skills(skill_name);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_user ON public.assessment_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_role ON public.assessment_attempts(role);
CREATE INDEX IF NOT EXISTS idx_assessment_answers_attempt ON public.assessment_answers(attempt_id);
CREATE INDEX IF NOT EXISTS idx_questions_role ON public.questions(role);
CREATE INDEX IF NOT EXISTS idx_questions_skill ON public.questions(skill);
CREATE INDEX IF NOT EXISTS idx_questions_active ON public.questions(is_active);
CREATE INDEX IF NOT EXISTS idx_learning_lessons_course ON public.learning_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_learning_progress_user ON public.learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_user ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_user ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_job_listings_active ON public.job_listings(is_active);
CREATE INDEX IF NOT EXISTS idx_job_listings_source ON public.job_listings(source, source_id);
CREATE INDEX IF NOT EXISTS idx_job_listings_posted ON public.job_listings(posted_at);
CREATE INDEX IF NOT EXISTS idx_job_listings_type ON public.job_listings(opportunity_type);
CREATE INDEX IF NOT EXISTS idx_job_matches_user ON public.job_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_job_matches_job ON public.job_matches(job_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user ON public.saved_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_user ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_job ON public.applications(job_id);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_user ON public.interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_answers_session ON public.interview_answers(session_id);

-- ==============================================================================
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_skill_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User Skills Policies
DROP POLICY IF EXISTS "Users manage own skills" ON public.user_skills;
CREATE POLICY "Users manage own skills" ON public.user_skills FOR ALL USING (auth.uid() = user_id);

-- Assessment Attempts Policies
DROP POLICY IF EXISTS "Users manage own attempts" ON public.assessment_attempts;
CREATE POLICY "Users manage own attempts" ON public.assessment_attempts FOR ALL USING (auth.uid() = user_id);

-- Assessment Answers Policies
DROP POLICY IF EXISTS "Users manage own answers" ON public.assessment_answers;
CREATE POLICY "Users manage own answers" ON public.assessment_answers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.assessment_attempts WHERE id = assessment_answers.attempt_id AND user_id = auth.uid())
  );

-- Assessment Skill Results Policies
DROP POLICY IF EXISTS "Users manage own skill results" ON public.assessment_skill_results;
CREATE POLICY "Users manage own skill results" ON public.assessment_skill_results FOR ALL USING (auth.uid() = user_id);

-- Public Read for Catalog Data (Questions, Courses, Lessons)
DROP POLICY IF EXISTS "Active questions are viewable by everyone" ON public.questions;
CREATE POLICY "Active questions are viewable by everyone" ON public.questions FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Active courses are viewable by everyone" ON public.learning_courses;
CREATE POLICY "Active courses are viewable by everyone" ON public.learning_courses FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Active lessons are viewable by everyone" ON public.learning_lessons;
CREATE POLICY "Active lessons are viewable by everyone" ON public.learning_lessons FOR SELECT USING (is_active = true);

-- Learning Progress Policies
DROP POLICY IF EXISTS "Users manage own learning progress" ON public.learning_progress;
CREATE POLICY "Users manage own learning progress" ON public.learning_progress FOR ALL USING (auth.uid() = user_id);

-- Projects Policies
DROP POLICY IF EXISTS "Users manage own projects" ON public.projects;
CREATE POLICY "Users manage own projects" ON public.projects FOR ALL USING (auth.uid() = user_id);

-- Resumes Policies
DROP POLICY IF EXISTS "Users manage own resumes" ON public.resumes;
CREATE POLICY "Users manage own resumes" ON public.resumes FOR ALL USING (auth.uid() = user_id);

-- Job Listings Policies (Public read, Server/Admin write)
DROP POLICY IF EXISTS "Active job listings are readable by everyone" ON public.job_listings;
CREATE POLICY "Active job listings are readable by everyone" ON public.job_listings FOR SELECT USING (is_active = true);

-- Job Matches Policies
DROP POLICY IF EXISTS "Users manage own job matches" ON public.job_matches;
CREATE POLICY "Users manage own job matches" ON public.job_matches FOR ALL USING (auth.uid() = user_id);

-- Saved Jobs Policies
DROP POLICY IF EXISTS "Users manage own saved jobs" ON public.saved_jobs;
CREATE POLICY "Users manage own saved jobs" ON public.saved_jobs FOR ALL USING (auth.uid() = user_id);

-- Applications Policies
DROP POLICY IF EXISTS "Users manage own applications" ON public.applications;
CREATE POLICY "Users manage own applications" ON public.applications FOR ALL USING (auth.uid() = user_id);

-- Interview Sessions Policies
DROP POLICY IF EXISTS "Users manage own interview sessions" ON public.interview_sessions;
CREATE POLICY "Users manage own interview sessions" ON public.interview_sessions FOR ALL USING (auth.uid() = user_id);

-- Interview Answers Policies
DROP POLICY IF EXISTS "Users manage own interview answers" ON public.interview_answers;
CREATE POLICY "Users manage own interview answers" ON public.interview_answers FOR ALL USING (auth.uid() = user_id);

-- User Preferences Policies
DROP POLICY IF EXISTS "Users manage own preferences" ON public.user_preferences;
CREATE POLICY "Users manage own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);

-- ==============================================================================
-- 13. STORAGE BUCKET & STORAGE POLICIES
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS on storage.objects for private resumes bucket
DROP POLICY IF EXISTS "Users can upload own resume" ON storage.objects;
CREATE POLICY "Users can upload own resume" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can view own resume" ON storage.objects;
CREATE POLICY "Users can view own resume" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can update own resume" ON storage.objects;
CREATE POLICY "Users can update own resume" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can delete own resume" ON storage.objects;
CREATE POLICY "Users can delete own resume" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ==============================================================================
-- 14. AUTH PROFILE CREATION & UPDATE TRIGGER (Google OAuth & Email)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    avatar_url, 
    selected_role
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    'Full Stack Developer'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    avatar_url = COALESCE(public.profiles.avatar_url, EXCLUDED.avatar_url),
    updated_at = now();

  INSERT INTO public.user_preferences (user_id, language)
  VALUES (NEW.id, 'en')
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
