"use client"
import { Download } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

function FileItem({ file }) {
    const [password,setPassword]=useState("")
    return (
      file && (
        <div>
          <div className="p-5 rounded-md bg-white flex flex-col items-center">
            <div className="text-center flex-col gap-3 items-center flex">
              <h2 className="text-[20px] text-gray-600">
                <strong className="text-primary">{file.userName}</strong> Shared
                the file with You
              </h2>
              <Image
                src="/file-gif.gif"
                width={150}
                height={150}
                className="w-[150px] p-5"
              />
              <h2 className="text-gray-500 text-[15px]">
                {file.fileName} 
              </h2>
              <h2 className="text-gray-500 text-[15px]">
                📑 File Type : {file.fileType} 
              </h2>
              <h2 className="text-gray-500 text-[15px]">
                ⚡File Size : {(file.fileSize / 1024 / 1024).toFixed(2)}MB
              </h2>
            </div>
            {file.password && (
              <input
                type="text"
                className="p-2 border rounded-md text-[14px] mt-5 text-center outline-blue-400"
                placeholder="Enter Password to access"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            )}
            <button
              className="flex gap-2 p-2 bg-primary text-white rounded-full w-full items-center hover:bg-blue-600 text-[14px] mt-5 text-center justify-center disabled:bg-gray-300"
              disabled={file.password != password}
              onClick={() => window.open(file?.fileUrl)}
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            <h2 className="text-gray-400 text-[12px] mt-2">
              *Term and Condition apply
            </h2>
          </div>
        </div>
      )
    );
}

export default FileItem
