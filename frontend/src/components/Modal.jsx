import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import './Modal.css';

function Modal() {
  return (
    <div className="modal">
      {/* modal header */}
      <div className="modalHeader">
        <h5 className="heading">Confirm</h5>
      </div>
      <button className="closeBtn">
        <RiCloseLine></RiCloseLine>
      </button>
      {/* modal content */}
      <div className="modalContent">Are you sure to log out?</div>
      <div className="modalActions">
        <div className="actionsContainer">
          <button className="logOutBtn">Logout</button>
          <button className="cancelBtn">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
