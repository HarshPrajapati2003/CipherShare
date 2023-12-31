import Image from 'next/image';
import React from 'react'
// https://firebasestorage.googleapis.com/v0/b/first-project-11055.appspot.com/o/file-upload%2FScreenshot%202023-09-06%20105021.png?alt=media&token=49455c5e-aa34-424e-9d5e-fdd13bf3a98b

function FileInfo({ file }) {
    const isImage = file?.fileType.startsWith("image")
    const returnFileImage = (fileType) => {
      switch (fileType) {
        case "audio/mpeg":
          return "/MPEG_Logo.png";
        case "application/pdf":
          return "/PDF_Logo.png";
        case "application/msword":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          return "/Word_Logo.png";
        case "application/vnd.ms-excel":
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          return "/Excel_Logo.png";
        case "application/vnd.ms-powerpoint":
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          return "/PowerPoint_Logo.png";
        case "text/plain":
          return "/Text_Logo.jpg";
        case "application/zip":
          return "/Zip_Logo.png";
        case "application/json":
          return "/JSON_Logo.png";
        case "application/xml":
          return "/XML_Logo.png";
        case "application/vnd.rar":
          return "/RAR_Logo.png";
        case "text/html":
          return "/HTML_Logo.png";
        case "text/css":
          return "/CSS_Logo.png";
        case "text/x-c":
        case "text/plain":
          return "/C_Logo.png";
        case "text/x-c++":
          return "/CPP_Logo.png";
        case "application/x-python-script":
        case "text/x-python":
          return "/Python_Logo.png";
        case "application/java-archive":
          return "/Java_Logo.png";
        case "application/javascript":
        case "text/javascript":
          return "/JavaScript_Logo.png";
        default:
          return "/file.jpg";
      }
    };

    return (
      <div className="p-3">
        <div className="flex flex-col items-center p-5 border border-gray-300 rounded-md">
          <div className="h-auto rounded-md mx-auto">
            <Image
              src={isImage ? file?.fileUrl : returnFileImage(file?.fileType)}
              alt="Uploaded file Image"
              height={400}
              width={250}
            />
          </div>
          <div className="text-center mt-4">
            <h2>{file?.fileName}</h2>
            <h2 className="text-[12px] text-gray-400">
              {file?.fileType} {file?.fileSize}
            </h2>
          </div>
        </div>
      </div>
    );
}

export default FileInfo
