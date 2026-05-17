// src/api/authApi.ts

import API from "./axiosConfig";

import type {
  LoginRequest,
  AuthResponse
} from "../types/auth";

export const loginUser = async (
  data: LoginRequest
): Promise<AuthResponse> => {

  const response = await API.post(
    "/api/auth/login",
    data
  );

  return response.data;
};