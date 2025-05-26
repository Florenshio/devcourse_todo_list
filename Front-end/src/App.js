import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import TodoPage from "./pages/todo-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
