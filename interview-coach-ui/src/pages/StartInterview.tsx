// src/pages/StartInterview.tsx

import {
  Briefcase,
  Code2,
  Layers3,
  BrainCircuit,
  Clock3,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createInterview } from "../api/interviewApi";

const StartInterview = () => {

  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const [experience, setExperience] =
    useState("1-3 Years");

  const [techStack, setTechStack] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [numberOfQuestions, setNumberOfQuestions] =
    useState(10);

  const handleStartInterview = async () => {

    console.log("BUTTON CLICKED");

    console.log({
      role,
      experience,
      techStack,
      difficulty,
      numberOfQuestions,
    });

    try {

      const response = await createInterview({
        role,
        experience,
        techStack,
        difficulty,
        numberOfQuestions,
      });

      console.log(
        "INTERVIEW CREATED:",
        response
      );

      navigate(`/interview/${response.id}`);

    } catch (error) {

      console.error(
        "FAILED TO CREATE INTERVIEW:",
        error
      );
    }
  };

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full" />

      </div>

      {/* Content */}
      <div className="relative z-10 p-10">

        {/* Header */}
        <div className="mb-12">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all mb-6"
          >

            <ArrowLeft size={20} />

            Back to Dashboard

          </button>

          <h1 className="text-6xl font-bold mb-4">
            Start Interview
          </h1>

          <p className="text-gray-400 text-xl">
            Configure your AI-powered mock interview
          </p>

        </div>

        {/* Form Card */}
        <div className="max-w-5xl bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-xl shadow-2xl">

          <div className="grid grid-cols-2 gap-8">

            {/* Role */}
            <div>

              <label className="flex items-center gap-3 mb-4 text-lg text-gray-300">

                <Briefcase size={22} />

                Role

              </label>

              <input
                type="text"
                placeholder="Java Backend Developer"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-lg outline-none focus:border-blue-500 transition-all"
              />

            </div>

            {/* Experience */}
            <div>

              <label className="flex items-center gap-3 mb-4 text-lg text-gray-300">

                <Clock3 size={22} />

                Experience

              </label>

              <select
                value={experience}
                onChange={(e) =>
                  setExperience(e.target.value)
                }
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-lg outline-none focus:border-blue-500 transition-all"
              >

                <option>0-1 Years</option>
                <option>1-3 Years</option>
                <option>3-5 Years</option>
                <option>5+ Years</option>

              </select>

            </div>

            {/* Tech Stack */}
            <div>

              <label className="flex items-center gap-3 mb-4 text-lg text-gray-300">

                <Code2 size={22} />

                Tech Stack

              </label>

              <input
                type="text"
                placeholder="Java, Spring Boot, Kafka"
                value={techStack}
                onChange={(e) =>
                  setTechStack(e.target.value)
                }
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-lg outline-none focus:border-blue-500 transition-all"
              />

            </div>

            {/* Difficulty */}
            <div>

              <label className="flex items-center gap-3 mb-4 text-lg text-gray-300">

                <BrainCircuit size={22} />

                Difficulty

              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-lg outline-none focus:border-blue-500 transition-all"
              >

                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>

              </select>

            </div>

            {/* Number of Questions */}
            <div className="col-span-2">

              <label className="flex items-center gap-3 mb-4 text-lg text-gray-300">

                <Layers3 size={22} />

                Number of Questions

              </label>

              <input
                type="number"
                value={numberOfQuestions}
                onChange={(e) =>
                  setNumberOfQuestions(
                    Number(e.target.value)
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-lg outline-none focus:border-blue-500 transition-all"
              />

            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-end mt-12">

            <button
              onClick={handleStartInterview}
              className="bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all px-10 py-5 rounded-2xl text-xl font-semibold shadow-lg shadow-blue-600/20"
            >
              Start AI Interview
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StartInterview;