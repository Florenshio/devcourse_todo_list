import React, { useState, useEffect } from "react";
import api from "./api/axios";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamName, setTeamName] = useState("");

  // 할 일 목록 가져오기
  const fetchTodos = async () => {
    try {
      const response = await api.get("/tasks");
      if (response.status === 200) {
        setTodos(response.data);
        console.log("할 일 목록 조회 성공");
      } else {
        console.error("할 일 목록 조회 실패");
      }
    } catch (error) {
      console.error("할 일 목록 조회 중 오류 발생:", error);
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
      const response = await api.post("/tasks", {
        title: todoInput,
        team_id: 1, // TODO: 실제 팀 ID로 변경 필요
      });

      if (response.status === 201) {
        setTodos([...todos, response.data]);
        setTodoInput("");
        console.log("할 일 생성 성공");
      } else {
        console.error("할 일 생성 실패");
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

      const response = await api.patch(`/tasks/${id}/status`, {
        status: newStatus,
      });

      if (response.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        );
        setTodos(updatedTodos);
        console.log("할일 상태 변경 성공");
      } else {
        console.error("할일 상태 변경 실패");
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

  const handleUpdate = async (id) => {
    if (editInput.trim() === "") {
      console.error("할 일 내용이 비어있습니다.");
      return;
    }

    const todo = todos.find((t) => t.id === id);
    if (todo.title === editInput) {
      console.log("변경된 내용이 없습니다.");
      setEditId(null);
      return;
    }

    try {
      const response = await api.put(`/tasks/${id}`, {
        title: editInput,
      });

      if (response.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, title: editInput } : todo
        );
        setTodos(updatedTodos);
        setEditId(null);
        console.log("할 일 수정 성공");
      } else {
        console.error("할 일 수정 실패");
      }
    } catch (error) {
      console.error("할 일 수정 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditInput("");
  };

  // 할일 삭제
  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await api.delete(`/tasks/${deleteId}`);

      if (response.status === 204) {
        const updatedTodos = todos.filter((todo) => todo.id !== deleteId);
        setTodos(updatedTodos);
        console.log("할 일 삭제 성공");
      } else {
        console.error("할 일 삭제 실패");
      }
    } catch (error) {
      console.error("할 일 삭제 중 오류 발생:", error);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
    console.log("삭제 취소");
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      console.error("팀 이름을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/teams", {
        name: teamName,
      });

      if (response.status === 201) {
        console.log("팀 생성 성공");
        setShowTeamModal(false);
        setTeamName("");
      } else {
        console.error("팀 생성 실패");
      }
    } catch (error) {
      console.error("팀 생성 중 오류 발생:", error);
    }
  };

  const handleTeamModalClose = () => {
    setShowTeamModal(false);
    setTeamName("");
    console.log("팀 만들기 취소");
  };

  return (
    <div className="todo-layout">
      <div className="todo-page">
        {/* 좌측 메뉴 */}
        <div className="todo-sidebar">
          <div className="todo-menu">
            <button className="todo-menu-itm">개인 할 일 목록</button>
            <button
              className="todo-sidebar-btn btn-gray-outlined"
              onClick={() => setShowTeamModal(true)}
            >
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
      {/* 삭제 모달 */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal modal-delete">
            <div className="modal-content">
              <div className="modal-title">정말 삭제하시겠습니까?</div>
              <div className="modal-buttons">
                <button
                  className="btn-gray-filled"
                  onClick={handleDeleteConfirm}
                >
                  확인
                </button>
                <button
                  className="btn-gray-outlined"
                  onClick={handleDeleteCancel}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTeamModal && (
        <div className="modal-overlay">
          <div className="modal modal-team">
            <div className="modal-content">
              <div className="modal-team-content">
                <div className="modal-title">팀 만들기</div>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="팀 이름을 입력해주세요"
                  className="text-field-placeholder"
                />
              </div>
              <div className="modal-buttons">
                <button className="btn-gray-filled" onClick={handleCreateTeam}>
                  만들기
                </button>
                <button
                  className="btn-gray-outlined"
                  onClick={handleTeamModalClose}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoPage;
