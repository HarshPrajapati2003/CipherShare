"use client"
import React, { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
// import { app } from '@/firebaseConfig';
import { app } from '../../../../../firebaseConfig';
import Link from "next/link";
import { ArrowLeftSquare } from 'lucide-react';
import FileInfo from './_components/FileInfo';
import FileShareForm from './_components/FileShareForm';
import { ToastContainer, toast } from 'react-toastify';

function FilePreview({ params }) {
    const db = getFirestore(app);
    const [file,setFile]=useState()
    useEffect(() => {
        console.log(params?.fileId)
        params?.fileId&&getFileInfo();
    }, [])
    const getFileInfo = async() => {
        const docRef = doc(db, "UploadedFile", params.fileId);
        const docSnap = await getDoc(docRef);  
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFile(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
    }

    const onPasswordSave = async(password) => {
        const docRef = doc(db, "UploadedFile", params?.fileId)
        await updateDoc(docRef, {
            password:password
        })
        toast.success("Password Saved");
    }

    return (
      <div className="py-10 md:px-20">
        <ToastContainer position="top-center" className="toast-top-center" />
        <Link href="/upload" className="flex gap-3 ms-3">
          <ArrowLeftSquare />
          Go to Upload
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
          <FileInfo file={file} />
          <FileShareForm
            file={file}
            onPasswordSave={(password) => onPasswordSave(password)}
          />
        </div>
      </div>
    );
}

export default FilePreview
