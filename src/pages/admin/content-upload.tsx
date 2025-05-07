import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileUp, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useAuthStore } from '../../store/auth-store';

const ContentUpload = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [questionType, setQuestionType] = useState<'mcq' | 'short'>('mcq');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  // Redirect if not admin
  React.useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedTopic) {
      setError('Please select a file and topic');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('topicId', selectedTopic);
    formData.append('questionType', questionType);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-questions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setSuccess(true);
      setFile(null);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Upload Content</h1>

      {error && (
        <div className="bg-error/10 border border-error rounded-md p-4 mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 text-error mr-2" />
          <p className="text-error">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-success/10 border border-success rounded-md p-4 mb-6">
          <p className="text-success">Upload successful!</p>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Question Type</label>
            <select
              className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as 'mcq' | 'short')}
            >
              <option value="mcq">Multiple Choice Questions</option>
              <option value="short">Short Questions</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <select
              className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              {/* Add subjects dynamically */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Chapter</label>
            <select
              className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              disabled={!selectedSubject}
            >
              <option value="">Select Chapter</option>
              {/* Add chapters dynamically */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Topic</label>
            <select
              className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              disabled={!selectedChapter}
            >
              <option value="">Select Topic</option>
              {/* Add topics dynamically */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload Document</label>
            <div className="border-2 border-dashed border-input rounded-md p-8">
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload a Word document (.docx) containing your questions
                </p>
                <input
                  type="file"
                  accept=".docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    <FileUp className="h-4 w-4 mr-2" />
                    Select File
                  </Button>
                </label>
                {file && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleUpload}
            disabled={loading || !file || !selectedTopic}
            className="w-full"
          >
            {loading ? 'Uploading...' : 'Upload Content'}
          </Button>
        </div>
      </div>

      <div className="mt-8 bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Document Format Guidelines</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">For MCQs:</h3>
            <pre className="bg-accent p-4 rounded-md text-sm">
              {`Q. What is the capital of Pakistan?
A) Karachi
B) Lahore
C) Islamabad (correct)
D) Peshawar
Explanation: Islamabad is the capital city of Pakistan since 1967.

Q. Next question...`}
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">For Short Questions:</h3>
            <pre className="bg-accent p-4 rounded-md text-sm">
              {`Q. Explain the process of photosynthesis (10 marks)
Answer: Photosynthesis is the process by which plants convert light energy into chemical energy...

Q. Next question...`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentUpload;