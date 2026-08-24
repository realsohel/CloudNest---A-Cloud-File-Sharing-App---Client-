import React, { useContext, useState } from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import { useAuth } from '@clerk/react';
import { userCreditsContext } from '../context/UserCreditsContext';
import { AlertCircle } from 'lucide-react';
import { uploadFiles } from '../services/FileService';
import UploadBox from '../components/UploadBox';

const Uploads = () => {

  const [files, setFiles] =useState([]);
  const [uploading, setUploading] =useState(false);
  const [message, setMessage] =useState("");
  const [messageType, setMessageType] =useState("");
  const {getToken}= useAuth();
  const {credits, setCredits} = useContext(userCreditsContext);
  const MAX_FILES=5;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > MAX_FILES) {
      setMessage(
        `You can only upload a maximum of ${MAX_FILES} files at once`
      );
      setMessageType("error");
      return;
    }

    if (totalFiles > credits) {
      setMessage(
        `You only have ${credits} credit${credits === 1 ? "" : "s"} remaining. Please select ${credits} or fewer file${credits === 1 ? "" : "s"}.`
      );
      setMessageType("error");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    setMessage("");
    setMessageType("");
  };

  const handleRemoveFile = (index)=>{
    setFiles((prevFiles)=>prevFiles.filter((_,idx)=> idx !==index));
    setMessage("");
    setMessageType("");
  }

  const isUplaodDisabled = files.length===0 || files.length > MAX_FILES || credits<=0 || files.length > credits; 

  const handleUpload = async()=>{
    if(files.length===0){
      setMessage("Please select atleast One file to upload.");
      setMessageType("error");
      return;
    }

    if(files.length>MAX_FILES){
      setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
      setMessageType("error")
      return;
    }

    setUploading(true);
    setMessage("Uploading the files...");
    setMessageType("info");

    const formData = new FormData();
    files.forEach((file)=>formData.append("files",file));
    console.log(files);

    try{
      const token = await getToken();
      const response = await uploadFiles(token, formData);

      if(response.data && response.data.remainingCredits!== undefined){
        setCredits(response.data.remainingCredits);
      }

      setMessage("Files sploaded successfully.");
      setMessageType("success");
      setFiles([]);

    }catch(error){
      console.log("Error Upload files: ", error);
      setMessage(error.response?.data?.message || "Error Upload files. Please try again later.");
      setMessageType("error");
    }finally{
      setUploading(false);
    }
  }


  return (
    <DashboardLayout activeMenu={"Upload"}>
      <div className="p-6 ">
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType==='error' ? 'bg-red-50 text-red-700': messageType==='success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
            {messageType==='error' && <AlertCircle size={20}/>}
            {message}
          </div>
        )}
      </div>
      <UploadBox
        files={files}
        onFileChange={handleFileChange}
        onUpload={handleUpload}
        uploading={uploading}
        onRemoveFile={handleRemoveFile}
        remainingCredits={credits}
        isUplaodDisabled={isUplaodDisabled}
      />
    </DashboardLayout>
  )
}

export default Uploads
