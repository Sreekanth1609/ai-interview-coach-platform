// src/App.tsx
import StartInterview from "./pages/StartInterview";
import InterviewSession from "./pages/InterviewSession";
import InterviewResult from "./pages/InterviewResult";
import InterviewHistory from "./pages/InterviewHistory";
import ResumeUpload from "./pages/ResumeUpload";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/start-interview"
          element={
            <ProtectedRoute>
              <StartInterview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview/:id"
          element={
            <ProtectedRoute>
              <InterviewSession />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview-result/:id"
          element={<InterviewResult />}
      />
      <Route
          path="/history"
          element={<InterviewHistory />}
      />

      <Route
          path="/resume-upload"
          element={<ResumeUpload />}
      />
      

      </Routes>

    </BrowserRouter>
  );
}

export default App;