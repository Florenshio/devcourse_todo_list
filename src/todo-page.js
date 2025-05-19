import React, { useState } from "react";
import "./index.css";

function TodoPage() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const handleAddTodo = () => {
    if (!todoInput.trim()) return;
    setTodos([...todos, { id: Date.now(), text: todoInput, done: false }]);
    setTodoInput("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  const handleEditSave = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editInput } : todo
      )
    );
    setEditId(null);
    setEditInput("");
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditInput("");
  };

  return (
    <div className="todo-layout">
      <div className="todo-page">
        {/* 좌측 메뉴 */}
        <div className="todo-sidebar">
          <div className="todo-menu">
            <div className="todo-menu-itm">할 일 목록</div>
            <button className="todo-sidebar-btn btn-gray-outlined ">
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
                    <div key={todo.id} className="todo-item-row">
                      <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => handleToggle(todo.id)}
                      />
                      {editId === todo.id ? (
                        <>
                          <input
                            type="text"
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            className="todo-input text-field-placeholder"
                            style={{ flex: 1, padding: 4 }}
                          />
                          <button
                            className="btn-gray-filled todo-save-btn"
                            onClick={() => handleEditSave(todo.id)}
                          >
                            완료
                          </button>
                          <button
                            className="btn-gray-outlined todo-cancel-btn"
                            onClick={handleEditCancel}
                          >
                            취소
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="todo-item-text">{todo.text}</span>
                          <button
                            className="todo-edit-btn"
                            onClick={() => handleEdit(todo.id, todo.text)}
                          >
                            수정
                          </button>
                          <button
                            className="todo-delete-btn"
                            onClick={() => handleDelete(todo.id)}
                          >
                            삭제
                          </button>
                        </>
                      )}
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
                    <div key={todo.id} className="todo-item-row">
                      <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => handleToggle(todo.id)}
                      />
                      <span className="todo-item-text done">{todo.text}</span>
                      <button
                        className="todo-delete-btn"
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
