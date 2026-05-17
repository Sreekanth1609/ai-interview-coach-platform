// src/pages/InterviewSession.tsx

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getInterviewById,
  submitInterview,
} from "../api/interviewApi";

import type {
  InterviewSession as InterviewType,
} from "../types/interview";

const InterviewSession = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [interview, setInterview] =
    useState<InterviewType | null>(null);

  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);

  const [answers, setAnswers] = useState<{
    [key: number]: string;
  }>({});

  const [timeLeft, setTimeLeft] =
    useState(180);

  useEffect(() => {

    const fetchInterview = async () => {

      if (!id) return;

      try {

        const response =
          await getInterviewById(id);

        console.log(
          "INTERVIEW FETCHED:",
          response
        );

        setInterview(response);

      } catch (error) {

        console.error(
          "FAILED TO FETCH INTERVIEW:",
          error
        );
      }
    };

    fetchInterview();

  }, [id]);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  if (!interview) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">

        Loading Interview...

      </div>
    );
  }

  const questions = interview.questions;

  const currentQuestion =
    questions[currentQuestionIndex];

  const formatTime = (
    seconds: number
  ) => {

    const mins =
      Math.floor(seconds / 60);

    const secs =
      seconds % 60;

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleNext = () => {

    if (
      currentQuestionIndex <
      questions.length - 1
    ) {

      setCurrentQuestionIndex(
        currentQuestionIndex + 1
      );
    }
  };

  const handlePrevious = () => {

    if (currentQuestionIndex > 0) {

      setCurrentQuestionIndex(
        currentQuestionIndex - 1
      );
    }
  };

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />
        

      </div>

      {/* Content */}
      <div className="relative z-10 p-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">

          <div>

            <p className="text-gray-400 mb-3">
              Interview Session
            </p>

            <h1 className="text-5xl font-bold">

              Question {
                currentQuestionIndex + 1
              }

            </h1>

          </div>

          {/* Timer */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">

            <Clock3 size={24} />

            <span className="text-2xl font-bold">

              {formatTime(timeLeft)}

            </span>

          </div>

        </div>

        {/* Progress */}
        <div className="mb-10">

          <div className="flex items-center justify-between mb-3">

            <span className="text-gray-400">
              Progress
            </span>

            <span className="text-gray-400">

              {currentQuestionIndex + 1}
              /
              {questions.length}

            </span>

          </div>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-blue-600 transition-all"
              style={{
                width: `${(
                  (currentQuestionIndex + 1)
                  /
                  questions.length
                ) * 100}%`,
              }}
            />

          </div>

        </div>

        {/* Question Card */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-xl shadow-2xl mb-10">

          <div className="mb-8">

            <h2 className="text-3xl font-semibold leading-relaxed">

              {currentQuestion}

            </h2>

          </div>

          {/* Answer Box */}
          <textarea
            value={
              answers[currentQuestionIndex] || ""
            }
            onChange={(e) =>
              setAnswers({
                ...answers,
                [currentQuestionIndex]:
                  e.target.value,
              })
            }
            placeholder="Type your answer here..."
            rows={10}
            className="w-full bg-black/40 border border-white/10 rounded-3xl p-6 text-lg outline-none focus:border-blue-500 transition-all resize-none"
          />

        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between">

          {/* Previous */}
          <button
            onClick={handlePrevious}
            disabled={
              currentQuestionIndex === 0
            }
            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-all px-8 py-4 rounded-2xl"
          >

            <ArrowLeft size={22} />

            Previous

          </button>

          {/* Finish or Next */}
          {currentQuestionIndex ===
          questions.length - 1 ? (

            <button
              onClick={async () => {

                if (!id) return;

                try {

                    const response =
                    await submitInterview(
                        id,
                        {
                        answers,
                        }
                    );

                    console.log(
                    "INTERVIEW SUBMITTED:",
                    response
                    );

                    navigate(
                    `/interview-result/${id}`
                    );

                } catch (error) {

                    console.error(
                    "FAILED TO SUBMIT:",
                    error
                    );
                }
                }}
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 transition-all px-8 py-4 rounded-2xl font-semibold"
            >

              <CheckCircle2 size={22} />

              Finish Interview

            </button>

          ) : (

            <button
              onClick={handleNext}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition-all px-8 py-4 rounded-2xl font-semibold"
            >

              Next

              <ArrowRight size={22} />

            </button>

          )}

        </div>

      </div>

    </div>
  );
};

export default InterviewSession;