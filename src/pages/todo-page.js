import React, { useState } from "react";
import "../styles/index.css";
import "../styles/todo.css";
import "../styles/modal.css";
import Sidebar from "../components/Sidebar";
import TodoList from "../components/TodoList";
import DeleteModal from "../components/DeleteModal";
import TeamModal from "../components/TeamModal";
import { useTodos } from "../hooks/useTodos";
import { useTeams } from "../hooks/useTeams";

function TodoPage() {
  const [todoInput, setTodoInput] = useState("");

  const {
    teams,
    selectedTeamId,
    showTeamModal,
    teamName,
    setTeamName,
    setShowTeamModal,
    handleCreateTeam,
    handleTeamSelect,
    handlePersonalTodoSelect,
    handleTeamModalClose,
  } = useTeams();

  const {
    todos,
    editId,
    editInput,
    setEditInput,
    showDeleteModal,
    handleAddTodo,
    handleToggle,
    handleEdit,
    handleUpdate,
    handleCancel,
    handleDelete,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useTodos(selectedTeamId);

  const handleAddTodoClick = async () => {
    const success = await handleAddTodo(todoInput);
    if (success) {
      setTodoInput("");
    }
  };

  return (
    <div className="todo-layout">
      <div className="todo-page">
        <Sidebar
          teams={teams}
          selectedTeamId={selectedTeamId}
          handleTeamSelect={handleTeamSelect}
          handlePersonalTodoSelect={handlePersonalTodoSelect}
          setShowTeamModal={setShowTeamModal}
        />
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
              onClick={handleAddTodoClick}
            >
              등록하기
            </button>
          </div>
          <TodoList
            todos={todos}
            editId={editId}
            editInput={editInput}
            setEditInput={setEditInput}
            handleUpdate={handleUpdate}
            handleCancel={handleCancel}
            handleToggle={handleToggle}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          handleDeleteConfirm={handleDeleteConfirm}
          handleDeleteCancel={handleDeleteCancel}
        />
      )}
      {showTeamModal && (
        <TeamModal
          teamName={teamName}
          setTeamName={setTeamName}
          handleCreateTeam={handleCreateTeam}
          handleTeamModalClose={handleTeamModalClose}
        />
      )}
    </div>
  );
}

export default TodoPage;
