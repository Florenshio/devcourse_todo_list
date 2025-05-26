import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";

function LoginForm() {
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { error, errorMessage, setError, handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(user_id, password);
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">로그인</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="아이디를 입력해주세요."
            value={user_id}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            className={`login-input text-field-placeholder${
              error ? " error" : ""
            }`}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={`login-input text-field-placeholder${
              error ? " error" : ""
            }`}
          />
          {error && <p className="error-message">{errorMessage}</p>}
          <button className="btn-gray-filled login-button" type="submit">
            로그인
          </button>
          <button
            className="signup-button btn-gray-outlined"
            type="button"
            onClick={handleSignupClick}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
