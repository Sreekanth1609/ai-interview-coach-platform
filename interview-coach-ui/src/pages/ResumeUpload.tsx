import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Upload,
  FileText,
} from "lucide-react";

import { uploadResume } from "../api/resumeApi";

const ResumeUpload = () => {

  const navigate = useNavigate();

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleUpload = async () => {

    if (!file) {

      alert("Please select a resume");

      return;
    }

    try {

      setLoading(true);

      const response =
        await uploadResume(file);

      console.log(
        "RESUME RESPONSE:",
        response
      );

      navigate(
        `/interview/${response.interviewId}`
      );

    } catch (error) {

      console.error(error);

      alert("Failed to upload resume");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Resume Based Interview
      </h1>

      <div className="max-w-3xl bg-gradient-to-r from-blue-950 to-purple-950 border border-white/10 rounded-[32px] p-10">

        {/* Header */}
        <div className="flex items-center gap-5 mb-8">

          <div className="bg-blue-600/20 p-5 rounded-3xl">
            <FileText size={40} />
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              Upload Resume
            </h2>

            <p className="text-gray-400 text-lg">
              AI will analyze your resume
              and generate a mock interview
            </p>

          </div>
        </div>

        {/* File Input */}
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {

            if (e.target.files?.[0]) {

              setFile(
                e.target.files[0]
              );
            }
          }}
          className="mb-8 block w-full text-gray-300"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 text-lg"
        >

          <Upload size={22} />

          {
            loading
              ? "Analyzing Resume..."
              : "Upload Resume"
          }

        </button>

      </div>
    </div>
  );
};

export default ResumeUpload;