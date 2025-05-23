import React, { useState } from "react";

function Sidebar({
  teams,
  selectedTeamId,
  handleTeamSelect,
  handlePersonalTodoSelect,
  setShowTeamModal,
  todos,
  onSelectTodo,
  onTeamDeleteClick,
  onTeamInviteClick,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleMenuClick = (teamId) => {
    setOpenMenuId(openMenuId === teamId ? null : teamId);
  };

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
          <div key={team.id} style={{ position: "relative" }}>
            <div className="team-menu-row">
              <button
                className={`todo-menu-itm ${
                  selectedTeamId === team.id ? "active" : ""
                }`}
                onClick={() => handleTeamSelect(team.id)}
              >
                {`팀 ${team.name}의 할일 목록`}
              </button>
              <button
                className="todo-menu-more-btn"
                onClick={() => handleMenuClick(team.id)}
              >
                ...
              </button>
            </div>
            {openMenuId === team.id && (
              <div className="todo-menu-popup">
                <div className="todo-menu-popup-buttons">
                  <button onClick={onTeamInviteClick}>초대하기</button>
                  <button onClick={() => onTeamDeleteClick(team.id)}>
                    삭제하기
                  </button>
                </div>
              </div>
            )}
          </div>
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
