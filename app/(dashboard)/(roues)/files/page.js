"use client";
import React, { useEffect, useState } from "react";
import Table from "./_components/Table";
import { useUser } from "@clerk/nextjs";
import { app } from "../../../../firebaseConfig";
import {
  doc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

function Files() {
  const { user } = useUser();
  const db = getFirestore(app);
  const [file, setFile] = useState([]);
  const [render,setRender]=useState(false)

  useEffect(() => {
    if (user) {
      console.log(user.primaryEmailAddress.emailAddress);
      getFileInfo();
    }
  }, [user, render]);

  const getFileInfo = async () => {
    const q = query(
      collection(db, "UploadedFile"),
      where("userEmail", "==", user.primaryEmailAddress.emailAddress)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot) {
      const files = [];
      querySnapshot.forEach((doc) => {
        files.push(doc.data());
      });
      setFile(files); // Update the state with the array of files
      console.log(files);
    } else {
      console.log("No such document!");
    }
  };


  return (
    <>
      {file.length > 0 ? (
        <>
          <div class="mx-auto max-w-3xl text-center my-9">
            <h2 class="text-3xl font-bold text-primary sm:text-4xl">
              Your Uploaded Files
            </h2>
            <p class="mt-4 text-gray-500 sm:text-xl">
              Total No. of Files : {file.length}
            </p>
          </div>

          <Table
            file={file}
            setFile={setFile}
            setRender={setRender}
            render={render}
          />
        </>
      ) : (
        <div class="mx-auto max-w-3xl text-center my-9">
          <p class="mt-4 text-gray-500 sm:text-xl">No files are Uploaded yet</p>
        </div>
      )}
    </>
  );
}

export default Files;
