import React from "react";
import ReactDOM from "react-dom";
import { apply, tw } from "twind";

const modalShadow = apply`fixed w-full h-full top-0 left-0 bg-gray-500 opacity-70 z-10`;
const modalContainer = apply`fixed w-full h-full top-0 left-0 flex justify-center items-center z-20 pointer-events-none`;
const modalWindow = apply`max-w-lg h-auto bg-white shadow rounded p-6 pointer-events-auto`;

const Modal = ({
  children,
  onClose,
  addBackgroundClassNames = "",
  addContainerClassNames = "",
  addWindowClassNames = "",
}) => {
  return ReactDOM.createPortal(
    <>
      <div
        className={tw(modalShadow, addBackgroundClassNames)}
        onClick={onClose}
      ></div>
      <div className={tw(modalContainer, addContainerClassNames)}>
        <div className={tw(modalWindow, addWindowClassNames)}>{children}</div>
      </div>
    </>,
    document.getElementById("app-modal")
  );
};

export default Modal;
