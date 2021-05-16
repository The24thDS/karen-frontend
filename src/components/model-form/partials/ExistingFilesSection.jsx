import { removeFile } from "api/assets.api";
import LoadingIndicator from "components/loading-indicator/LoadingIndicator";
import Modal from "components/modal/Modal";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { apply, tw } from "twind";

const rowStyle = apply`flex justify-between items-center px-2 py-2 mb-2 mx-6 border rounded shadow(& hover:none)`;
const deleteIconStyle = apply`cursor-pointer hover:text-red-500`;
const buttonBaseStyles = tw`p-2 mt-2 text-white rounded`;
const greenButton = apply(buttonBaseStyles, `bg-green-600`);
const redButton = apply(
  buttonBaseStyles,
  `bg-red-600 min-w-1/2 flex items-center`
);

const FileItem = ({ file, slug, username, type, ...rest }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const deleteFile = async () => {
    setDeleteLoading(true);
    const response = await removeFile({ name: file, slug, username }, type);
    if (response.success) {
      setDeleteLoading(false);
      setModalOpen(false);
      setDeleted(true);
    }
  };

  return (
    <>
      <li
        className={tw(
          rowStyle,
          deleted ? "border-red-600 bg-red-200 shadow-none" : null
        )}
        {...rest}
      >
        <span>{file}</span>{" "}
        {deleted ? (
          "DELETED"
        ) : (
          <AiFillDelete
            className={tw(deleteIconStyle)}
            onClick={() => setModalOpen(true)}
          />
        )}
      </li>
      {modalOpen && (
        <Modal onClose={closeModal}>
          <h1 className={tw`text-xl`}>This file will be deleted forever!</h1>
          <p className={tw`text-md`}>Are you sure you want to proceed?</p>
          <div className={tw`flex justify-between`}>
            <button className={tw(greenButton)} onClick={closeModal}>
              Go back
            </button>
            <button className={tw(redButton)} onClick={deleteFile}>
              {deleteLoading ? (
                <>
                  <span className={tw`mr-2`}>Deleting file</span>{" "}
                  <LoadingIndicator size={4} accentColor="red" />
                </>
              ) : (
                "Yes, delete this file!"
              )}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

const ExistingFilesSection = ({ files, slug, username, type }) => {
  return (
    <ul className={tw`mt-1 mb-4`}>
      {files?.map((file, index) => (
        <FileItem
          key={file + index}
          file={file}
          slug={slug}
          username={username}
          type={type}
        />
      ))}
    </ul>
  );
};

export default ExistingFilesSection;
