import React from "react";

function DeleteModal({ handleDeleteConfirm, handleDeleteCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal modal-delete">
        <div className="modal-content">
          <div className="modal-title">정말 삭제하시겠습니까?</div>
          <div className="modal-buttons">
            <button className="btn-gray-filled" onClick={handleDeleteConfirm}>
              확인
            </button>
            <button className="btn-gray-outlined" onClick={handleDeleteCancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
