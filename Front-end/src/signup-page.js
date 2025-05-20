import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

const SignupPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    // 입력값 검증
    if (!userId || !password || !repassword) {
      setError(true);
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== repassword) {
      setError(true);
      setErrorMessage("비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      const data = {
        user_id: userId,
        password: password,
        repassword: repassword,
      };

      console.log("회원가입 시도:", data);

      const response = await axios({
        method: "post",
        url: "http://localhost:3000/api/signup",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("서버 응답:", response.data);

      if (response.data.success) {
        setError(false);
        setErrorMessage("");
        alert("회원가입 성공!");
      } else {
        setError(true);
        setErrorMessage(response.data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      console.error("에러 상세:", error.response?.data);
      setError(true);
      setErrorMessage("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">회원가입</h1>
        <form onSubmit={handleSignup}>
          <input
            placeholder="아이디를 입력해주세요."
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setError(false);
              setErrorMessage("");
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
              setError(false);
              setErrorMessage("");
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
              setError(false);
              setErrorMessage("");
            }}
            className={`login-input text-field-placeholder${
              error ? " error" : ""
            }`}
          />
          {error && <p className="error-message">{errorMessage}</p>}
          <button className="btn-gray-filled signup-button " type="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
