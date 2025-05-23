import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export function useAuth() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (user_id, password) => {
    try {
      console.log("로그인 시도:", { user_id, password });
      const response = await api.post("/api/auth/login", {
        user_id,
        password,
      });

      console.log("서버 응답:", response.data);

      if (response.status === 200) {
        setError(false);
        alert("로그인 성공!");
        navigate("/todo");
        return true;
      } else {
        setError(true);
        alert("로그인 실패: " + response.data.message);
        return false;
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      console.error("에러 상세:", error.response?.data);
      setError(true);
      return false;
    }
  };

  const handleSignup = async (userId, password, repassword) => {
    setError(false);
    setErrorMessage("");

    // 입력값 검증
    if (!userId || !password || !repassword) {
      setError(true);
      setErrorMessage("모든 필드를 입력해주세요.");
      return false;
    }

    if (password !== repassword) {
      setError(true);
      setErrorMessage("비밀번호가 일치하지 않습니다");
      return false;
    }

    try {
      const data = {
        user_id: userId,
        password: password,
        repassword: repassword,
      };

      console.log("회원가입 시도:", data);

      const response = await api.post("/api/users/register", data);

      console.log("서버 응답:", response.data);

      if (response.status === 201) {
        setError(false);
        setErrorMessage("");
        alert("회원가입 성공!");
        navigate("/");
        return true;
      } else {
        setError(true);
        setErrorMessage(response.data.message || "회원가입에 실패했습니다.");
        return false;
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      console.error("에러 상세:", error.response?.data);
      setError(true);
      setErrorMessage("회원가입 중 오류가 발생했습니다.");
      return false;
    }
  };

  return {
    error,
    errorMessage,
    setError,
    setErrorMessage,
    handleLogin,
    handleSignup,
  };
}
