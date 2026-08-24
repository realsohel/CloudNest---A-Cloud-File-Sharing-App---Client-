import { useAuth } from '@clerk/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DownloadFile, getPublicFile } from '../services/FileService';
import toast from 'react-hot-toast';
import { Copy, Download, File, Info} from 'lucide-react';
import LinkShareModal from '../components/LinkShareModal';
import logo from "../assets/cloudNestLogo.png";

const PublicFileView = () => {
  const [file,setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shareModal, setShareModal] = useState({
    isOpen: false,
    link:""
  });
  const {getToken} = useAuth();
  const {fileId} = useParams();

  useEffect(()=>{

    const getFile = async()=>{
      setIsLoading(true);
      try{
        const token = await getToken();
        const res = await getPublicFile(token,fileId);
        
        setFile(res.data);
        setError(null);
      }catch(error){
        console.log("Error Fetching Public File: ", error.message);
        toast.error("Could not fetch the file. The link may be invalid or the file may be removed.");
      }
      finally{
        setIsLoading(false);
      }
    }
    getFile();
  },[getToken, fileId])

  const handleDownload = async (file) => {
    try {
        const token = await getToken();

        const res = await DownloadFile(token, file.id);
        const response = res.data;
        console.log("S3 URL:", response.fileLocation);

        const fileResponse = await fetch(response.fileLocation);

        console.log("S3 status:", fileResponse.status);
        console.log("S3 content-type:", fileResponse.headers.get("content-type"));

        if (!fileResponse.ok) {
            throw new Error("Failed to fetch file from S3");
        }

        const blob = await fileResponse.blob();

        console.log("Blob type:", blob.type);
        console.log("Blob size:", blob.size);

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = file.name;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 1000);

    } catch (error) {
        console.error("Error Downloading the file:", error);
        toast.error("Error downloading the file. Please try again later.");
    }
  };

  const openShareModal = (fileId)=>{
    // const link = `${window.location.origin}/file/${fileId}`;
    setShareModal({
      isOpen:true,
      link: window.location.href
    })
  }

  const closeShareModal =()=>{
    setShareModal({
      isOpen:false,
      link:""
    })
  }

  const formatFileSize = (bytes) => {

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  };

  const formatDate = (dateString) => {

    if (!dateString) return "Unknown";

    return new Date(dateString).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }
    );

  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
          <p className="text-gray-600">
              Loading file...
          </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-red-600">
                  Error
              </h2>

              <p className="text-gray-600 mt-2">
                  {error}
              </p>
          </div>
      </div>
    );
  }

  if(!file) return null;
  
  return (

    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <header className="p-3 border-b bg-white">

        <div className="container mx-auto flex justify-between items-center">

          <div className="flex items-center gap-2">
            <img src={logo} alt="" width={60}/>
            <span className="font-bold text-gray-800">
              CloudNest
            </span>
          </div>


          <button
            onClick={openShareModal}
            className=" flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors "
          >
            <Copy size={18} />
            Share Link
          </button>

        </div>
      </header>


      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:px-8">

        <div className="max-w-4xl mx-auto">

          {/* File Card */}
          <div className=" bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

            {/* File Header */}
            <div className="flex flex-col items-center text-center px-6 py-8">

              {/* File Icon */}
              <div className=" w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                <File size={42} className="text-blue-600" />
              </div>


              {/* File Name */}
              <h1 className=" text-2xl md:text-3xl font-semibold text-gray-900 break-all ">
                {file.name}
              </h1>


              {/* File Meta */}
              <p className="mt-3 text-sm text-gray-500">
                {formatFileSize(file.size)}
                <span className="mx-2">
                  •
                </span>
                Shared on {formatDate(file.uploadedAt)}
              </p>


              {/* File Type */}
              <span className=" mt-6 inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium uppercase">
                {file.type || "Unknown"}
              </span>


              {/* Download Button */}
              <button 
                onClick={() => handleDownload(file)}
                className=" mt-8 flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm">
                <Download size={18} />
                Download File
              </button>

            </div>


            {/* Divider */}
            <div className="mx-8 border-t border-gray-300" />

            {/* File Information */}
            <div className="px-8 py-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                File Information
              </h2>


              <div className="space-y-5">
                {/* File Name */}
                <div className="flex justify-between items-center gap-4">

                  <span className="text-gray-500">
                    File Name:
                  </span>

                  <span className=" text-gray-800 font-medium text-right break-all">
                    {file.name}
                  </span>

                </div>


                {/* File Type */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-500">
                    File Type:
                  </span>

                  <span className="text-gray-800">
                    {file.type || "Unknown"}
                  </span>
                </div>


                {/* File Size */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-500">
                    File Size:
                  </span>

                  <span className="text-gray-800">
                    {formatFileSize(file.size)}
                  </span>
                </div>


                {/* Uploaded */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-500">
                    Shared:
                  </span>

                  <span className="text-gray-800">
                    {formatDate(file.uploadedAt)}
                  </span>
                </div>

              </div>
            </div>
          </div>


          {/* Public Information */}
          <div className="mt-6 border border-blue-200 bg-blue-50 rounded-lg px-5 py-4 flex items-center gap-3">

            <Info size={21} className="text-blue-700 shrink-0"/>

            <p className="text-sm text-blue-800">
              This file has been shared publicly.
              Anyone with this link can view and download it.
            </p>

          </div>

        </div>

      </main>


      {/* Share Modal */}
      <LinkShareModal
        isOpen={shareModal.isOpen}
        onClose={closeShareModal}
        link={shareModal.link}
        title="Share File"
      />

    </div>
  );
};

export default PublicFileView;