import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const SignupPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    alert(`회원가입 시도: ID - ${userId}, 비밀번호 - ${password}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">회원가입</h1>
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
          <input
            type="password"
            placeholder="비밀번호 확인를 다시 입력해주세요."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="login-input"
          />
        <button onClick={handleSignup} className="login-button login-button-primary">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
