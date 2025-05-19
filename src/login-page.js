import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api/axios";
import "./index.css";

const LoginPage = () => {
  const [user_id, setuser_id] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("로그인 시도:", { user_id, password });
      const response = await api.post("/api/login", {
        user_id,
        password,
      });

      console.log("서버 응답:", response.data);

      if (response.data.success) {
        setError(false);
        // JWT 토큰은 쿠키에 자동으로 저장됨
        alert("로그인 성공!");
        navigate("/todo"); // 로그인 성공 후 todo 페이지로 이동
      } else {
        setError(true);
        alert("로그인 실패: " + response.data.message);
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      console.error("에러 상세:", error.response?.data);
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">로그인</h1>
        <form onSubmit={handleLogin}>
          <input
            placeholder="아이디를 입력해주세요."
            value={user_id}
            onChange={(e) => {
              setuser_id(e.target.value);
              setError(false);
            }}
            className={`login-input ${error ? "error" : ""}`}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className={`login-input ${error ? "error" : ""}`}
          />
          {error && (
            <p className="error-message">아이디와 비밀번호를 확인해주세요</p>
          )}
          <button type="submit" className="login-button login-button-primary">
            로그인
          </button>
          <Link to="/signup" className="login-button login-button-secondary">
            회원가입
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
