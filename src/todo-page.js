import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function TodoPage() {
  const [todoInput, setTodoInput] = useState("");
  // TODO: 백엔드 연동 시 아래 임시 데이터를 빈 배열로 변경
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState([
    { id: 1, title: "리액트 공부하기", done: false },
    { id: 2, title: "타입스크립트 공부하기", done: false },
    { id: 3, title: "백엔드 API 연동하기", done: true },
    { id: 4, title: "CSS 스타일링 완성하기", done: true },
  ]);
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  // 할 일 목록 가져오기
  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
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

  const handleAddTodo = async () => {
    if (!todoInput.trim()) return;

    try {
      await axios.post("/api/todos", {
        title: todoInput,
      });
      const newTodo = {
        id: Date.now(),
        title: todoInput,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setTodoInput("");
      console.log("새로운 할 일이 추가되었습니다.");
    } catch (error) {
      console.error("할 일 추가 중 오류 발생:", error);
    }
  };

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEdit = (id, title) => {
    setEditId(id);
    setEditInput(title);
  };

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
              {todos.filter((todo) => !todo.done).length === 0 ? (
                <div className="todo-empty-text">할 일 항목이 없습니다</div>
              ) : (
                todos
                  .filter((todo) => !todo.done)
                  .map((todo) => (
                    <div key={todo.id} className="todo-item">
                      <div className="todo-checkfield">
                        <input
                          type="checkbox"
                          checked={todo.done}
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
              {todos.filter((todo) => todo.done).length === 0 ? (
                <div className="done-empty-text">완료 항목이 없습니다</div>
              ) : (
                todos
                  .filter((todo) => todo.done)
                  .map((todo) => (
                    <div key={todo.id} className="todo-item">
                      <div className="todo-checkfield">
                        <input
                          type="checkbox"
                          checked={todo.done}
                          onChange={() => handleToggle(todo.id)}
                        />
                        <span className="todo-item-text done">
                          {todo.title}
                        </span>
                      </div>
                      <button
                        className="todo-delete-btn btn-red-outlined "
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
