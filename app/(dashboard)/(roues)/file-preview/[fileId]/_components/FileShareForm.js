"use client"
import React, { useRef, useState } from "react";
import { Copy } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function FileShareForm({ file, onPasswordSave }) {
  const inputRef = useRef(null);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [email,setEmail]=useState()

  const handleCheckboxChange = () => {
    setIsPasswordEnabled(!isPasswordEnabled);
  };

  const copyToClipboard = () => {
    if (inputRef.current) {
        inputRef.current.select();
      document.execCommand("copy");
      toast.success("Copied Successfully");
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault()
    if (email) {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/send`,
          {
            fileName: file.fileName,
            fileSize: file.fileSize,
            fileType: file.fileType,
            userEmail: file.userEmail,
            userName: file.userName,
            shortUrl: file.shortUrl,
            email: email,
          }
        );
        if (res.status == 200) {
          toast.success("Mail Sent");
        } else {
          alert("somthing went wrong");
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please Enter Email Address")
    }
    
  }
  return (
    <div className="md:px-0 sm:px-5">
      <form className="w-[80%] mx-auto" onSubmit={(e) => sendEmail(e)}>
        <div className="mb-5">
          <label
            htmlFor="ShortUrl"
            className="block mb-2 text-sm text-gray-900 dark:text-white"
          >
            Short Url
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              id="short-url"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your short URL"
              value={file?.shortUrl}
            />
            <div
              className="absolute inset-y-0 end-2 flex items-center ps-3.5 cursor-pointer"
              onClick={copyToClipboard}
            >
              <Copy />
            </div>
          </div>
        </div>
        <div className="flex items-start mb-2">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              defaultValue=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              onChange={handleCheckboxChange}
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Enable Password?
          </label>
        </div>
        {isPasswordEnabled && (
          <div className="mb-5 flex gap-2">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              placeholder="Your password"
            />
            <button
              disabled={!password}
              className="text-white bg-primary hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[20%] sm:w-auto px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400"
              onClick={(e) => {
                e.preventDefault();
                onPasswordSave(password);
              }}
            >
              Save
            </button>
          </div>
        )}

        <div className="border rounded-md p-2">
          <div className="mb-3">
            <label
              htmlFor="sendEmail"
              className="block mb-2 text-sm text-gray-900 dark:text-white"
            >
              Send File to Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email-address-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <button
            type="submit"
            className="disable: text-white bg-primary hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send Email
          </button>
        </div>
        <ToastContainer position="top-center" className="toast-top-center" />
      </form>
    </div>
  );
}

export default FileShareForm;
