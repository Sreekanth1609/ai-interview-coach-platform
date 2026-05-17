// src/api/interviewApi.ts

import API from "./axiosConfig";

import type {
  CreateInterviewRequest,
  InterviewSession,
} from "../types/interview";

export const createInterview = async (
  data: CreateInterviewRequest
): Promise<InterviewSession> => {

  const response = await API.post(
    "/api/interviews",
    data
  );

  return response.data;
};

export const getInterviewById = async (
  id: string
): Promise<InterviewSession> => {

  const response = await API.get(
    `/api/interviews/${id}`
  );

  return response.data;
};

export const submitInterview = async (
  id: string,

  data: {
    answers: {
      [key: number]: string;
    };
  }
): Promise<InterviewSession> => {

  const response = await API.post(
    `/api/interviews/${id}/submit`,
    data
  );

  return response.data;
};

export const getInterviewResult = async (
  id: string
): Promise<InterviewSession> => {

  const response = await API.get(
    `/api/interviews/${id}`
  );

  return response.data;
};

export const getUserInterviews = async () => {

  const response = await API.get(
    "/api/interviews/user"
  );

  return response.data;
};

export const getDashboardStats = async () => {

  const response = await API.get(
    "/api/interviews/dashboard/stats"
  );

  return response.data;
};