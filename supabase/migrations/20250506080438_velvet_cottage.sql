/*
  # Questions Management Schema

  1. New Tables
    - `subjects`
      - `id` (uuid, primary key)
      - `name` (text)
      - `grade` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `chapters`
      - `id` (uuid, primary key) 
      - `subject_id` (uuid, foreign key)
      - `name` (text)
      - `order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `topics`
      - `id` (uuid, primary key)
      - `chapter_id` (uuid, foreign key)
      - `name` (text)
      - `order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `mcq_questions`
      - `id` (uuid, primary key)
      - `topic_id` (uuid, foreign key)
      - `question_text` (text)
      - `options` (jsonb)
      - `correct_option` (text)
      - `explanation` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `short_questions`
      - `id` (uuid, primary key)
      - `topic_id` (uuid, foreign key)
      - `question_text` (text)
      - `answer_text` (text)
      - `marks` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create subjects table
CREATE TABLE subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  grade integer NOT NULL CHECK (grade BETWEEN 9 AND 12),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chapters table
CREATE TABLE chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  name text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create topics table
CREATE TABLE topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES chapters(id) ON DELETE CASCADE,
  name text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create MCQ questions table
CREATE TABLE mcq_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  options jsonb NOT NULL,
  correct_option text NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create short questions table
CREATE TABLE short_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  answer_text text NOT NULL,
  marks integer NOT NULL DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcq_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE short_questions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access for all authenticated users"
ON subjects FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access for all authenticated users"
ON chapters FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access for all authenticated users"
ON topics FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access for all authenticated users"
ON mcq_questions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access for all authenticated users"
ON short_questions FOR SELECT TO authenticated USING (true);

-- Admin policies for full access
CREATE POLICY "Allow full access for admin users"
ON subjects FOR ALL TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow full access for admin users"
ON chapters FOR ALL TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow full access for admin users"
ON topics FOR ALL TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow full access for admin users"
ON mcq_questions FOR ALL TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow full access for admin users"
ON short_questions FOR ALL TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_subjects_updated_at
    BEFORE UPDATE ON subjects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chapters_updated_at
    BEFORE UPDATE ON chapters
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_topics_updated_at
    BEFORE UPDATE ON topics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mcq_questions_updated_at
    BEFORE UPDATE ON mcq_questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_short_questions_updated_at
    BEFORE UPDATE ON short_questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();