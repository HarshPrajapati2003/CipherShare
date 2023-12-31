"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
// import { app } from '@/firebaseConfig';
import { app } from '../../../../firebaseConfig'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc,getFirestore } from "firebase/firestore";

import UploadSuccess from './_components/UploadSuccess';
import { useUser } from '@clerk/nextjs';
// import { GenerateRandomString } from '@/app/_utils/GenerateRandomString';
import { GenerateRandomString } from "../../../_utils/GenerateRandomString"
import { useRouter } from "next/navigation";

function Upload() {
  const router = useRouter()
  const {user}=useUser()
  const storage = getStorage(app);
  const db = getFirestore(app);

  const [progress, setProgress] = useState();
  const [success, setSuccess] = useState(false)
  const [uploadCompleted, setUploadCompleted] = useState(false)
  const[fileDocId,setFileDocId]=useState()
  
  useEffect(() => {
    uploadCompleted &&
      setTimeout(() => {
        setUploadCompleted(false);
        console.log("fileDocId:", fileDocId);
        router.push("/file-preview/" + fileDocId);
      }, 2000);
  }, [uploadCompleted == true && fileDocId!==undefined]);

  const uploadFile = (file) => {
    // const metadata = {
    //   contentType: file.type,
    // };
   
    const storageRef = ref(storage, "file-upload/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);

    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");

    setProgress(progress)
    if (progress === 100) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false);
      },2000)
    }
    // Upload completed successfully, now we can get the download URL
    progress==100&&getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
      saveInfo(file, downloadURL);
      setUploadCompleted(true)
    });
  }, )
  }

  const saveInfo = async (file,fileUrl) => {
    const docId = GenerateRandomString().toString();
    await setDoc(doc(db, "UploadedFile", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: "",
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + "f/" + docId,
    });
    setFileDocId(docId);
  }

  return (
    <div className="p-5 px-8 md:px-28">
      {success && (
        <div className="text-center">
          <UploadSuccess />
        </div>
      )}
      <h2 className="text-[20px] text-center m-5">
        Start <strong className="text-primary">Uploading</strong> File and{" "}
        <strong className="text-primary">Share</strong> it
      </h2>
      <UploadForm
        uploadBtnClick={(file) => uploadFile(file)}
        progress={progress}
        setProgress={setProgress}
      />
    </div>
  );
}

export default Upload
