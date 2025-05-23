import React from "react";

function Sidebar({
  teams,
  selectedTeamId,
  handleTeamSelect,
  handlePersonalTodoSelect,
  setShowTeamModal,
}) {
  return (
    <div className="todo-sidebar">
      <div className="todo-menu">
        <button
          className={`todo-menu-itm ${!selectedTeamId ? "active" : ""}`}
          onClick={handlePersonalTodoSelect}
        >
          개인 할 일 목록
        </button>
        {teams.map((team) => (
          <button
            key={team.id}
            className={`todo-menu-itm ${
              selectedTeamId === team.id ? "active" : ""
            }`}
            onClick={() => handleTeamSelect(team.id)}
          >
            {`${team.name}의 할일 목록`}
          </button>
        ))}
        <button
          className="todo-sidebar-btn btn-gray-outlined"
          onClick={() => setShowTeamModal(true)}
        >
          팀 만들기
        </button>
      </div>
      <div className="todo-divider"></div>
    </div>
  );
}

export default Sidebar;
