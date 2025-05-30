import React from "react";
import "../styles/modal.css";
import "../styles/team-modal.css";
import "../styles/index.css";

function TeamModal({
  teamName,
  setTeamName,
  handleCreateTeam,
  handleTeamModalClose,
  error,
  errorMessage,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal modal-team">
        <div className="modal-content">
          <div className="modal-team-content">
            <div className="modal-title">팀 만들기</div>
            <div className="modal-input-group">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="팀 이름을 입력해주세요"
                className={`text-field-placeholder ${error ? "error" : ""}`}
              />
              {error && <p className="error-message">{errorMessage}</p>}
            </div>
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
  );
}

export default TeamModal;
