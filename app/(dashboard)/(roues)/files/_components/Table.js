"use client"
import React, { useEffect } from 'react'
import { Eye, Trash2, X } from "lucide-react";
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '../../../../../firebaseConfig';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Table({ file, setFile, setRender,render}) {
  const db = getFirestore(app);
  const delFile = async (id) => {
    console.log(id);
    try {
      await deleteDoc(doc(db, "UploadedFile", id));
      // alert("File Deleted");
      toast.success("File Deleted");
      setRender(!render)
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {file && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  File name
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Password
                </th>
                <th scope="col" className="px-6 py-3">
                  View
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {file.map((f, index) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">{1 + index}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-normal max-w-[300px] dark:text-white"
                  >
                    {f.fileName}
                  </th>
                  <td className="px-6 py-4 font-medium whitespace-normal max-w-[300px] dark:text-white">
                    {f.fileType}
                  </td>
                  <td className="px-6 py-4">
                    {(f.fileSize / 1024).toFixed(2)}KB
                  </td>
                  <td className="px-6 py-4">
                    {f.password.length > 0 ? (
                      f.password
                    ) : (
                      <X className="text-red-600" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`${f.shortUrl}`}
                      className="font-medium text-primary dark:text-blue-500 hover:underline"
                    >
                      <Eye />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <Trash2
                      onClick={() => delFile(f.id)}
                      className="font-medium hover:text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="top-center" />
    </>
  );
}

export default Table
