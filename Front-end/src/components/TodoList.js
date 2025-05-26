import React from "react";

function TodoList({
  todos,
  editId,
  editInput,
  setEditInput,
  handleUpdate,
  handleCancel,
  handleToggle,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="todo-group">
      <div className="todo-list">
        <div className="todo-main-title">TO DO</div>
        <div className="todo-item-container">
          {todos.filter((todo) => todo.status === "todo").length === 0 ? (
            <div className="todo-empty-text">할 일 항목이 없습니다</div>
          ) : (
            todos
              .filter((todo) => todo.status === "todo")
              .map((todo) => (
                <div key={todo.id} className="todo-item">
                  {editId === todo.id ? (
                    // 수정 모드
                    <div className="todo-item-edit">
                      <input
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        className="todo-edit-input text-field-placeholder"
                      />
                      <div className="todo-btn">
                        <button
                          className="todo-edit-update-btn btn-gray-filled"
                          onClick={() => handleUpdate(todo.id)}
                        >
                          완료
                        </button>
                        <button
                          className="todo-edit-cancel-btn btn-gray-outlined"
                          onClick={handleCancel}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    // 일반 모드
                    <div className="todo-item-normal">
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
                  )}
                </div>
              ))
          )}
        </div>
      </div>
      <div className="done-list">
        <div className="todo-main-title">DONE</div>
        <div className="todo-item-container">
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
                    <span className="todo-item-text done">{todo.title}</span>
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
  );
}

export default TodoList;
