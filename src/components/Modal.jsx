// Modal.jsx
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
      {/* 内容容器：限制最大高度，超出可滚动 */}
      <div className="w-[90%] max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-white p-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
