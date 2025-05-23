import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function SignupForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const { error, errorMessage, handleSignup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignup(userId, password, repassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">회원가입</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="아이디를 입력해주세요."
            value={userId}
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
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={repassword}
            onChange={(e) => {
              setRepassword(e.target.value);
            }}
            className={`login-input text-field-placeholder${
              error ? " error" : ""
            }`}
          />
          {error && <p className="error-message">{errorMessage}</p>}
          <button className="btn-gray-filled signup-button" type="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
