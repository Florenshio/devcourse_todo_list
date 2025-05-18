import React, { useState } from 'react';
import './index.css';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`로그인 시도: ID - ${userId}, 비밀번호 - ${password}`);
  };

  const handleSignup = () => {
    alert('회원가입 페이지로 이동합니다.');
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">로그인</h1>
          <input
            placeholder="아이디를 입력해주세요."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        <button onClick={handleLogin} className="login-button login-button-primary">
          로그인
        </button>
        <button onClick={handleSignup} className="login-button login-button-secondary">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
