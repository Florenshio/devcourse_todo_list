import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003",
  withCredentials: true, // 쿠키를 주고받을 수 있도록 설정
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
