import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const LoginPage = () => {
  const [user_id, setuser_id] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(`로그인 시도: ID - ${user_id}, 비밀번호 - ${password}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">로그인</h1>
        <input
          placeholder="아이디를 입력해주세요."
          value={user_id}
          onChange={(e) => setuser_id(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button
          onClick={handleLogin}
          className="login-button login-button-primary"
        >
          로그인
        </button>
        <Link to="/signup" className="login-button login-button-secondary">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
