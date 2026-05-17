import {
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getInterviewResult,
} from "../api/interviewApi";

import type {
  InterviewSession,
} from "../types/interview";

const InterviewResult = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [interview, setInterview] =
    useState<InterviewSession | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchResult = async () => {

      try {

        if (!id) return;

        const response =
          await getInterviewResult(id);

        console.log(
          "INTERVIEW RESULT:",
          response
        );

        setInterview(response);

      } catch (error) {

        console.error(
          "FAILED TO FETCH RESULT:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    fetchResult();

  }, [id]);

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">

        Loading Result...

      </div>
    );
  }

  if (!interview?.evaluation) {

    return (

      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center text-3xl">

        No Evaluation Found

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white px-8 py-10">

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-all mb-8"
      >

        <ArrowLeft size={20} />

        Back to Dashboard

      </button>

      {/* Header */}
      <div className="mb-12">

        <h1 className="text-7xl font-bold mb-4">
          Interview Result
        </h1>

        <p className="text-2xl text-gray-400">
          AI evaluation summary of your mock interview
        </p>

      </div>

      {/* Score Card */}
      <div className="bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-white/10 rounded-[40px] p-14 flex justify-between items-center mb-10">

        <div>

          <p className="text-gray-400 text-3xl mb-6">
            Overall Score
          </p>

          <h2 className="text-[110px] font-bold text-emerald-400 leading-none">

            {interview.evaluation.score}%

          </h2>

        </div>

        <div className="bg-emerald-500/10 p-10 rounded-full">

          <Trophy
            size={90}
            className="text-emerald-400"
          />

        </div>

      </div>

      {/* Strengths + Improvements */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">

        {/* Strengths */}
        <div className="bg-black border border-white/10 rounded-[35px] p-10">

          <h3 className="text-5xl font-bold text-emerald-400 mb-10">
            Strengths
          </h3>

          <div className="space-y-7">

            {interview.evaluation.strengths.map(
              (item, index) => (

                <div
                  key={index}
                  className="flex gap-4 items-start"
                >

                  <CheckCircle2
                    className="text-emerald-400 mt-1"
                    size={24}
                  />

                  <p className="text-2xl leading-relaxed text-gray-200">

                    {item}

                  </p>

                </div>
              )
            )}

          </div>

        </div>

        {/* Improvements */}
        <div className="bg-purple-950/20 border border-white/10 rounded-[35px] p-10">

          <h3 className="text-5xl font-bold text-red-400 mb-10">
            Improvements
          </h3>

          <div className="space-y-7">

            {interview.evaluation.improvements.map(
              (item, index) => (

                <div
                  key={index}
                  className="flex gap-4 items-start"
                >

                  <XCircle
                    className="text-red-400 mt-1"
                    size={24}
                  />

                  <p className="text-2xl leading-relaxed text-gray-200">

                    {item}

                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </div>

      {/* Feedback */}
      <div className="bg-black border border-white/10 rounded-[35px] p-10">

        <h3 className="text-5xl font-bold mb-8">
          Overall Feedback
        </h3>

        <p className="text-2xl text-gray-300 leading-relaxed">

          {interview.evaluation.feedback}

        </p>

      </div>

    </div>
  );
};

export default InterviewResult;