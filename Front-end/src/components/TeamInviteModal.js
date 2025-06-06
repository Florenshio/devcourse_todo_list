import React from "react";
import "../styles/modal.css";
import "../styles/team-invite-modal.css";

function TeamInviteModal({
  open,
  onClose,
  onInvite,
  inviteInput,
  setInviteInput,
  invitedMembers,
  onRemoveMember,
  error,
  errorMessage,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal modal-invite">
        <div className="modal-content">
          <div className="modal-invite-content">
            <div className="modal-title">팀원 초대하기</div>
            <div className="modal-invite-input-group">
              <div className="modal-invite-input-row">
                <input
                  type="text"
                  value={inviteInput}
                  onChange={(e) => setInviteInput(e.target.value)}
                  placeholder="초대할 팀원의 아이디를 입력해주세요."
                  className={`modal-invite-input text-field-placeholder${
                    error ? " error" : ""
                  }`}
                />
                <button className="btn-gray-filled" onClick={onInvite}>
                  초대
                </button>
              </div>
              {error && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="modal-invite-list">
              {invitedMembers.map((member, idx) => (
                <div key={idx} className="modal-invite-member">
                  <div className="modal-invite-member-name">
                    {member.user.username}
                  </div>
                  <div
                    className="modal-invite-member-remove"
                    onClick={() => onRemoveMember(member.user_id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/delete-icon.png"
                      alt="삭제"
                      className="delete-icon"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-buttons">
            <button className="btn-gray-outlined" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamInviteModal;
