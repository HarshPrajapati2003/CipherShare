import React, { useState } from "react";
import AlertMsg from "./AlertMsg";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";

function UploadForm({ uploadBtnClick, progress, setProgress }) {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [isDragging, setIsDragging] = useState(false);

  const onFileSelect = (file) => {
    if (file && file.size > 2000000) {
      setErrorMsg("Maximum File Upload Size is 2MB");
    } else {
      setErrorMsg(null);
      setFile(file);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="text-center">
      <div
        className={`flex items-center justify-center w-full ${
          isDragging ? "border-blue-500" : "border-gray-300"
        } border-2 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-12 h-12 mb-4 text-blue-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload file</span> or{" "}
              <strong className="text-primary">drag</strong> and{" "}
              <strong className="text-primary">drop</strong>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Upload & Share any kind of file (Max Size: 2MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => onFileSelect(e.target.files[0])}
          />
        </label>
      </div>
      {errorMsg && <AlertMsg msg={errorMsg} />}
      {file ? (
        <FilePreview
          file={file}
          removeFile={() => {
            setFile(null);
            setProgress(0);
          }}
        />
      ) : null}
      {progress > 0 ? <ProgressBar progress={progress} /> : null}
      <button
        disabled={!file}
        className="p-2 bg-primary text-white w-[30%] rounded-full mt-5 disabled:bg-gray-400 cursor-pointer"
        onClick={() => uploadBtnClick(file)}
      >
        Upload
      </button>
    </div>
  );
}

export default UploadForm;
