"use client";
import React, { useRef } from "react";
import UploadForm from "../upload/page";

const Ubton = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Use useRef to reference the open button for accessibility

  const openModal = () => {
    modalRef.current?.showModal();
    modalRef.current?.focus(); // Focus on the modal for accessibility
  };

  const closeModal = () => {
    modalRef.current?.close();
    buttonRef.current?.focus(); // Focus back on the button for accessibility
  };

  return (
    <div className="m-6">
      <button ref={buttonRef} className="btn btn-primary btn-outline" onClick={openModal}>
        Click to Upload
      </button>
      <dialog
        ref={modalRef}
        id="my_modal_1"
        className="modal"
        onKeyDown={(e) => e.key === "Escape" && closeModal()}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">UPLOAD</h3>
          <p className="py-4">
            Please select files to upload or press close button to exit.
          </p>
          <UploadForm />
          <div className="modal-action">
            <button onClick={closeModal} className="btn btn-outline">
              Exit
            </button>
          </div>
        </div>
      </dialog>
      
    </div>
  );
};

export default Ubton;
