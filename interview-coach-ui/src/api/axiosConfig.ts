// src/api/axiosConfig.ts

import axios from "axios";

import { getToken } from "../utils/token";

const API = axios.create({
  baseURL: "https://api-gateway-iu1t.onrender.com",
});

API.interceptors.request.use(

  (config) => {

    const token = getToken();

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default API;