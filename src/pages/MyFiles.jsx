import React, { useEffect, useState } from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import { Copy, Download, Eye, File, FileText, Globe, Grid, Image, List, Lock, Music, Trash2, Video } from 'lucide-react';
import { DeleteFile, DownloadFile, fetchFiles, toggleView } from '../services/FileService';
import { useAuth } from '@clerk/react';
import { Link, useNavigate } from 'react-router-dom';
import FileCard from '../components/FileCard';
import ConfirmationDialog from '../components/ConfirmationDialog';
import toast from 'react-hot-toast';
import LinkShareModal from '../components/LinkShareModal';

const MyFiles = () => {
  const [files, setFiles] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const {getToken} = useAuth();
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState({
      isOpen:false,
      fileId:null
  });

  const [shareModal, setShareModal] = useState({
    isOpen:false,
    fileId:null,
    link:""
  })

  const getFileIcon = (file)=>{
      const extention = file.name.split('.').pop().toLowerCase();

      if(['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extention)){
          return <Video size={24} className='text-blue-500'/>
      }
      else if(['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extention)){
          return <Music size={24} className='text-green-500'/>
      }
      else if(['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extention)){
          return <Image size={24} className='text-purple-500'/>
      }
      else if(['pdf', 'doc', 'docx', 'txt', 'rtf', 'csv'].includes(extention)){
          return <FileText size={24} className='text-amber-500'/>
      }
      else{
          return <File size={24} className='text-purple-500'/>
      }
  }

  const toggleFile = async(fileId)=>{
    try {
      const token = await getToken();

      const response = await toggleView(token, fileId);
      console.log(response)

      const updatedFile = response.data;

      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === fileId
            ? {
                ...file,
                isPublic: updatedFile.isPublic
              }
            : file
        )
      )

    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }

  const handleDownload = async(file)=>{
    try {
      const token = await getToken();

      const response = await DownloadFile(token, file.id);
      console.log(response)

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href=url;
      link.setAttribute("download", file.name)
      document.body.appendChild(link);

      link.click(); // download file
      link.remove(); // delete file
      window.URL.revokeObjectURL(url); // Clean up the Object url

    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }


  const closeDeleteConfirmation=()=>{
    setDeleteConfirmation({
      isOpen:false,
      fileId:null
    })
  }

  const openDeleteConfirmation=(fileId)=>{
    setDeleteConfirmation({
      isOpen:true,
      fileId:fileId
    })
  }

  const openShareModal = (fileId)=>{
    const link = `${window.location.origin}/file/${fileId}`;

    setShareModal({
      isOpen:true,
      fileId,
      link
    })
  }

  const closeShareModal =()=>{
    setShareModal({
      isOpen:false,
      fileId:""
    })
  }

  const handleDelete = async()=>{
    const fileId = deleteConfirmation.fileId;

    if(!fileId)return;
    try {
      const token = await getToken();
      const response = await DeleteFile(token, fileId);

      if(response.status===204){
        setFiles(files.filter((file)=>file.id !== fileId))
        closeDeleteConfirmation();
      }
    } catch (error) {
      console.error('Error Deleting the file:', error);
    }
  }

  useEffect(()=>{
    const fetchingFiles = async () => {
      try {
        const token = await getToken();
        console.log(token)

        const response = await fetchFiles(token);

        setFiles(response.data);

      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchingFiles();


  }, [getToken]);


  return (
    <DashboardLayout activeMenu={"My-Files"}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              My Files {files.length}
            </h2>

            <div className="flex items-center gap-3">
              <List 
                onClick={()=>setViewMode("list")}
                size={24}
                className={`cursor-pointer transition-colors ${viewMode === "list" ? "text-blue-600": "text-gray-400 hover:text-gray-600"}`}
              />
              
              <Grid 
                onClick={()=>setViewMode("grid")}
                size={24}
                className={`cursor-pointer transition-colors ${viewMode === "grid" ? "text-blue-600": "text-gray-400 hover:text-gray-600"}`}
              />
            </div>
          </div>

          {files.length ==0 ? (
            <div className="my-12 bg-white rounded-lg shadow-lg p-12 flex flex-col items-center justify-center">
              <File size={60} className='text-purple-300 mb-4'/>

              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No files uploaded yet.
              </h3>

              <p className="text-gray-500 text-center max-w-md mb-6">
                Start uploading files to see them listed here. You can upload documents, images and other files to shar and manage them securely.
              </p>

              <button
                onClick={()=>navigate("/uploads")}
                className='px-4 py-2 bg-purple-500 cursor-pointer font-medium text-white rounded-md hover:bg-purple-600 transition-colors'
              >
                Go to Upload
              </button>
            </div>
          ):viewMode==="grid" ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {files.map((file)=>(
                  <FileCard 
                    key={file.id} file={file} 
                    toggleFile={toggleFile} 
                    openDeleteConfirmation={openDeleteConfirmation}
                    handleDelete={handleDelete}
                    handleDownload={handleDownload}
                    openShareModal={openShareModal}
                  />
                ))}

              </div>
          ):(
            <div className="overflow-x-hidden bg-white rounded-lg shadow">
              
              <table className='min-w-full'>
                <thead className='bg-gray-50 border-b border-gray-200'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Size</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Uploaded</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Sharing</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200'>
                  {files.map((file)=>(
                    <tr key={file.id} className='hover:bg-gray-50 transition-colors'>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        <div className="flex items-center gap-2 ">
                          {getFileIcon(file)}
                          {file.name}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {(file.size / 1024).toFixed(1)}KB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {new Date(file.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={()=>toggleFile(file.id)}
                            className="flex items-center gap-2 cursor-pointer group"
                          >
                            {file.isPublic ? (
                              <>
                                <Globe size={16} className='text-green-500'/>
                                <span className='group-hover:underline'>Public</span>
                              </>
                            ):(
                              <>
                                <Lock size={16} className='text-gray-500'/>
                                <span className='group-hover:underline'>Private</span>
                              </>
                            )}
                          </button>

                          {file.isPublic &&(
                            <button 
                              onClick={()=>openShareModal(file.id)}
                              className='flex items-center gap-2 cursor-pointer group text-blue-600'>
                              <Copy size={16}/>
                              <span className='group-hover:underline'>Share Link</span>

                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex justify-center">
                            <button
                              onClick={()=>handleDownload(file)}
                              title='Download'
                              className='text-gray-500 hover:text-blue-600 cursor-pointer'
                            >
                              <Download size={18}/>
                            </button>
                          </div>

                          <div className="flex justify-center">
                            <button
                              onClick={()=>openDeleteConfirmation(file.id)}
                              title='Delete'
                              className='text-gray-500 hover:text-red-600 cursor-pointer'
                            >
                              <Trash2 size={18}/>
                            </button>
                          </div>

                          <div className="flex justify-center">
                            {file.isPublic ?(
                              <a to={`/file/${file.id}`} title='View File' target='_blank' rel='noreferrer' className='text-gray-500 hover:text-blue-600'>
                                <Eye size={18}/>
                              </a>
                            ):(
                              <span className='w-4.5'></span>
                            )}
                          </div>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              
              </table>

            </div>
          )}

          <ConfirmationDialog
            isOpen={deleteConfirmation.isOpen}
            onClose={closeDeleteConfirmation}
            title='Delete File'
            message='Are you sure that you want to delete this file? This action cannot be undone.'
            confirmText='Delete'
            cancelText='Cancel'
            onConfirm={handleDelete}
            confirmationButtonClass='bg-red-600 hover:bg-red-700'
          />

          <LinkShareModal
            isOpen={shareModal.isOpen}
            onClose={closeShareModal}
            link={shareModal.link}
            title="Share File"
          />
        </div>
    </DashboardLayout>
  )
}

export default MyFiles
