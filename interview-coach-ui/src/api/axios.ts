import axios from "axios";

const api = axios.create({
  baseURL: "https://api-gateway-iu1t.onrender.com",
});

export default api;