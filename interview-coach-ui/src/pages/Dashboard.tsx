import {
  LayoutDashboard,
  Mic,
  History,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  FileText,
} from "lucide-react";

import AnalyticsChart from "../components/AnalyticsChart";

import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getUserInterviews,
} from "../api/interviewApi";

import type {
  DashboardStats,
} from "../types/interview";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [recentInterviews, setRecentInterviews] =
    useState<any[]>([]);

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        const statsData =
          await getDashboardStats();

        setStats(statsData);

        const interviews =
          await getUserInterviews();

        setRecentInterviews(
          interviews.slice(0, 5)
        );

      } catch (error) {

        console.error(
          "FAILED TO FETCH DASHBOARD:",
          error
        );
      }
    };

    fetchDashboardData();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <aside className="w-[260px] bg-white/5 border-r border-white/10 p-6 flex flex-col justify-between">

        <div>

          {/* Logo */}
          <div className="mb-12">

            <h1 className="text-4xl font-bold text-blue-500">
              InterviewAI
            </h1>

          </div>

          {/* Navigation */}
          <nav className="space-y-3">

            <button className="w-full flex items-center gap-4 bg-blue-600 px-4 py-3 rounded-2xl">

              <LayoutDashboard size={22} />

              <span className="text-lg">
                Dashboard
              </span>

            </button>

            <button
              onClick={() =>
                navigate("/start-interview")
              }
              className="w-full flex items-center gap-4 hover:bg-white/10 transition-all px-4 py-3 rounded-2xl"
            >

              <Mic size={22} />

              <span className="text-lg">
                Start Interview
              </span>

            </button>

            <button
              onClick={() =>
                navigate("/history")
              }
              className="w-full flex items-center gap-4 hover:bg-white/10 transition-all px-4 py-3 rounded-2xl"
            >

              <History size={22} />

              <span className="text-lg">
                History
              </span>

            </button>
            <button
                onClick={() =>
                  navigate("/resume-upload")
                }
                className="w-full flex items-center gap-4 hover:bg-white/10 transition-all px-4 py-3 rounded-2xl"
              >

                <FileText size={22} />

                <span className="text-lg">
                  Resume Upload
                </span>

              </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/10 transition-all px-4 py-3 rounded-2xl">

              <BarChart3 size={22} />

              <span className="text-lg">
                Analytics
              </span>

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/10 transition-all px-4 py-3 rounded-2xl">

              <Settings size={22} />

              <span className="text-lg">
                Settings
              </span>

            </button>

          </nav>

        </div>

        {/* Logout */}
        <button
          onClick={() => {

            localStorage.removeItem("token");

            navigate("/login");
          }}
          className="w-full flex items-center gap-4 hover:bg-red-500/20 transition-all px-4 py-3 rounded-2xl text-red-400"
        >

          <LogOut size={22} />

          <span className="text-lg">
            Logout
          </span>

        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-2">
              Dashboard
            </h1>

            <p className="text-gray-400 text-lg">
              Track your interview preparation journey
            </p>

          </div>

          <div className="flex items-center gap-5">

            {/* Search */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">

              <Search size={20} />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none"
              />

            </div>

            {/* Notifications */}
            <button className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all">

              <Bell size={22} />

            </button>

            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">

              S

            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h2 className="text-gray-400 mb-3">
              Total Interviews
            </h2>

            <p className="text-5xl font-bold text-blue-400">
              {stats?.totalInterviews ?? 0}
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h2 className="text-gray-400 mb-3">
              Completed
            </h2>

            <p className="text-5xl font-bold text-green-400">
              {stats?.completedInterviews ?? 0}
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h2 className="text-gray-400 mb-3">
              Average Score
            </h2>

            <p className="text-5xl font-bold text-yellow-400">
              {stats?.averageScore?.toFixed(1) ?? 0}%
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h2 className="text-gray-400 mb-3">
              Best Score
            </h2>

            <p className="text-5xl font-bold text-purple-400">
              {stats?.bestScore ?? 0}%
            </p>

          </div>

        </div>

        {/* Recent Interviews */}
        <div className="mb-12">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold">
              Recent Interviews
            </h2>

            <button
              onClick={() => navigate("/history")}
              className="text-blue-400 hover:text-blue-300"
            >

              View All

            </button>

          </div>

          <div className="space-y-4">

            {recentInterviews.map((interview) => (

              <div
                key={interview.id}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h3 className="text-2xl font-semibold">

                    {interview.role}

                  </h3>

                  <p className="text-gray-400 mt-2">

                    {interview.techStack}

                  </p>

                </div>

                <div className="text-right">

                  <p className="text-green-400 text-2xl font-bold">

                    {interview.evaluation?.score ?? 0}%

                  </p>

                  <p className="text-gray-400">

                    {interview.difficulty}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
        <AnalyticsChart interviews={recentInterviews} />

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Start Interview */}
          <div className="bg-gradient-to-r from-blue-950 to-purple-950 border border-white/10 rounded-[32px] p-10">

            <h2 className="text-4xl font-bold mb-4">
              Start New Interview
            </h2>

            <p className="text-gray-300 mb-8 text-lg">
              Practice AI-powered mock interviews based on your tech stack.
            </p>

            <button
              onClick={() =>
                navigate("/start-interview")
              }
              className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-4 rounded-2xl text-lg font-semibold"
            >

              Start Interview

            </button>

          </div>

          {/* History */}
          <div className="bg-gradient-to-r from-purple-950 to-pink-950 border border-white/10 rounded-[32px] p-10">

            <h2 className="text-4xl font-bold mb-4">
              Interview History
            </h2>

            <p className="text-gray-300 mb-8 text-lg">
              View previous interview attempts and track your improvement.
            </p>

            <button
              onClick={() =>
                navigate("/history")
              }
              className="bg-purple-600 hover:bg-purple-700 transition-all px-8 py-4 rounded-2xl text-lg font-semibold"
            >

              View History

            </button>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;