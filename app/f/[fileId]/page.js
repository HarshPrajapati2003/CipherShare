"use client"
import React, { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import FileItem from "./_components/FileItem"
import Link from 'next/link';
import Image from 'next/image';

function FileView({ params }) {
     const [file, setFile] = useState();
    useEffect(() => {
      params.fileId&&getFileInfo()
    }, []);

    const db = getFirestore(app);
    const getFileInfo = async () => {
      const docRef = doc(db, "UploadedFile", params.fileId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFile(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    
    return <div className='bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4'>
        <Link href="/upload">
            <Image src="/logo.svg" width={150} height={150} />
      </Link>
        <FileItem file={file} /></div>;
}

export default FileView
