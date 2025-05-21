import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function TodoPage() {
  const [todoInput, setTodoInput] = useState("");
  // TODO: 백엔드 연동 시 아래 임시 데이터를 빈 배열로 변경
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "리액트 공부하기",
      status: "todo",
      created_by: 1,
      team_id: 1,
    },
    {
      id: 2,
      title: "타입스크립트 공부하기",
      status: "todo",
      created_by: 1,
      team_id: 1,
    },
    {
      id: 3,
      title: "백엔드 API 연동하기",
      status: "done",
      created_by: 1,
      team_id: 1,
    },
    {
      id: 4,
      title: "CSS 스타일링 완성하기",
      status: "done",
      created_by: 1,
      team_id: 1,
    },
  ]);
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  // 할 일 목록 가져오기
  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTodos(response.data);
      console.log("서버에서 할 일 목록을 가져옵니다.");
    } catch (error) {
      console.error("할 일 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 컴포넌트 마운트 시 할 일 목록 가져오기
  useEffect(() => {
    fetchTodos();
  }, []);

  // 할일 생성
  const handleAddTodo = async () => {
    if (!todoInput.trim()) return; // 빈 입력값 처리

    try {
      const response = await axios.post("/api/tasks", {
        title: todoInput,
        team_id: 1, // TODO: 실제 팀 ID로 변경 필요
      });

      if (response.status === 201) {
        setTodos([...todos, response.data]);
        setTodoInput("");
        console.log("새로운 할 일이 추가되었습니다.");
      }
    } catch (error) {
      console.error("할 일 추가 중 오류 발생:", error);
    }
  };

  // 할일 상태 변경
  // TODO : status 타입을 boolean으로 변경시 코드 수정 필요
  const handleToggle = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const newStatus = todo.status === "todo" ? "done" : "todo";

      const response = await axios.patch(`/api/tasks/${id}/status`, {
        status: newStatus,
      });

      if (response.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        );
        setTodos(updatedTodos);
        console.log("할일 상태가 변경되었습니다.");
      }
    } catch (error) {
      console.error("할일 상태 변경 중 오류 발생:", error);
    }
  };

  // 할일 수정
  const handleEdit = (id, title) => {
    setEditId(id);
    setEditInput(title);
  };

  // 할일 삭제
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-layout">
      <div className="todo-page">
        {/* 좌측 메뉴 */}
        <div className="todo-sidebar">
          <div className="todo-menu">
            <div className="todo-menu-itm">할 일 목록</div>
            <button className="todo-sidebar-btn btn-gray-outlined">
              팀 만들기
            </button>
          </div>
          <div className="todo-divider"></div>
        </div>
        {/* 우측 메인 */}
        <div className="todo-main">
          <div className="todo-input-row">
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              placeholder="할 일을 입력하세요"
              className="todo-input text-field-placeholder"
            />
            <button
              className="btn-gray-filled todo-add-btn"
              onClick={handleAddTodo}
            >
              등록하기
            </button>
          </div>
          <div className="todo-group">
            <div className="todo-list">
              <div className="todo-main-title">TO DO</div>
              {todos.filter((todo) => todo.status === "todo").length === 0 ? (
                <div className="todo-empty-text">할 일 항목이 없습니다</div>
              ) : (
                todos
                  .filter((todo) => todo.status === "todo")
                  .map((todo) => (
                    <div key={todo.id} className="todo-item">
                      <div className="todo-checkfield">
                        <input
                          type="checkbox"
                          checked={todo.status === "done"}
                          onChange={() => handleToggle(todo.id)}
                        />
                        <span className="todo-item-text">{todo.title}</span>
                      </div>
                      <div className="todo-btn">
                        <button
                          className="todo-edit-btn btn-gray-outlined"
                          onClick={() => handleEdit(todo.id, todo.title)}
                        >
                          수정
                        </button>
                        <button
                          className="todo-delete-btn btn-red-outlined"
                          onClick={() => handleDelete(todo.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
            <div className="done-list">
              <div className="todo-main-title">DONE</div>
              {todos.filter((todo) => todo.status === "done").length === 0 ? (
                <div className="done-empty-text">완료 항목이 없습니다</div>
              ) : (
                todos
                  .filter((todo) => todo.status === "done")
                  .map((todo) => (
                    <div key={todo.id} className="todo-item">
                      <div className="todo-checkfield">
                        <input
                          type="checkbox"
                          checked={todo.status === "done"}
                          onChange={() => handleToggle(todo.id)}
                        />
                        <span className="todo-item-text done">
                          {todo.title}
                        </span>
                      </div>
                      <button
                        className="todo-delete-btn btn-red-outlined"
                        onClick={() => handleDelete(todo.id)}
                      >
                        삭제
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
