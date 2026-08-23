import React, { useRef, useState } from "react";
import {
    Upload,
    File,
    FileText,
    Image,
    Music,
    Video,
    X,
    Loader2,
} from "lucide-react";

const DashboardUpload = ({
    files,
    onFileChange,
    onUpload,
    uploading,
    onRemoveFile,
    remainingUploads,
    credits,
}) => {

    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);


    const handleBrowse = () => {
        fileInputRef.current?.click();
    };


    const handleDrop = (e) => {

        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(
            e.dataTransfer.files || []
        );

        if (droppedFiles.length === 0) {
            return;
        }

        onFileChange({ target: {files: droppedFiles,},});
    };


    const getFileIcon = (file) => {

        const extension = file.name.split(".").pop().toLowerCase();


        if(["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)) {
            return (
            <Image size={20} className="text-purple-500" />
            );
        }

        if(["mp4", "webm", "mov", "avi", "mkv"].includes(extension)) {
            return (
            <Video size={20} className="text-blue-500"/>
            );
        }

        if(["mp3", "wav", "ogg", "flac", "m4a"].includes(extension)) {
            return (
            <Music size={20} className="text-green-500" />
            );
        }

        if( ["pdf", "doc", "docx", "txt", "rtf", "csv"].includes(extension)) {
            return (
            <FileText size={20} className="text-amber-500" />
            );
        }


        return (
            <File size={20} className="text-gray-500"/>
        );
    };


    const formatFileSize = (bytes) => {
        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };


    const uploadDisabled = files.length === 0 || files.length > remainingUploads || uploading;


return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">

      {/* Header */}
        <div className="flex justify-between items-center mb-4">

            <div className="flex items-center gap-2">
                <Upload size={20} className="text-blue-600" />

                <h2 className="font-semibold text-gray-900">
                    Upload Files
                </h2>
            </div>

            <span className="text-sm text-gray-500">
                {credits} credits
            </span>
        </div>


      {/* Drop Zone */}
        <div 
            onClick={handleBrowse}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true);}}
            onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => { setIsDragging(false); }}
            onDrop={handleDrop}
            className={` min-h-55 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"}`}
        >

            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Upload size={24} className="text-blue-600" />
            </div>


            <p className="font-medium text-gray-800">
                {isDragging
                    ? "Drop files here"
                    : "Drag & drop files"}
            </p>

            <p className="text-sm text-gray-500 mt-1">
                or click to browse
            </p>

            <p className="text-xs text-gray-400 mt-2">
                {remainingUploads} uploads available
            </p>


            <input ref={fileInputRef} type="file" multiple hidden onChange={onFileChange}/>
        
        </div>


      {/* Selected Files */}
        {files.length > 0 && (

            <div className="mt-5">
                <div className="flex justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-800">
                        Selected Files ({files.length})
                    </h3>
                    <span className="text-xs text-gray-500">
                        {credits} credits
                    </span>

                </div>


                <div className="space-y-2">

                    {files.map((file, index) => (

                    <div key={`${file.name}-${index}`}
                        className=" flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-lg "
                    >

                        <div className="flex items-center gap-2 min-w-0">
                            <div className=" w-8 h-8 bg-white rounded flex items-center justify-center border">
                                {getFileIcon(file)}
                            </div>

                            <div className="min-w-0">

                                <p title={file.name} className="text-sm font-medium truncate">
                                    {file.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {formatFileSize(file.size)}
                                </p>

                            </div>
                        </div>


                        <button 
                            type="button"
                            disabled={uploading}
                            onClick={(e) => { e.stopPropagation(); onRemoveFile(index);}}
                            className=" p-1 text-gray-500 hover:text-red-600 transition-colors"
                        >
                            <X size={17} />
                        </button>

                    </div>
                    
                    ))}

                </div>


            {/* Upload Button */}
            <button
                type="button"
                disabled={uploadDisabled}
                onClick={onUpload}
                className={` w-full mt-4 py-2.5 rounded-lg flex justify-center items-center gap-2 font-medium transition-colors ${uploadDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed": "bg-blue-600 text-white hover:bg-blue-700"}`}
            >

                {uploading ? (
                    <>
                        <Loader2 size={17} className="animate-spin" />Uploading...
                    </>
                ) : (

                    <>
                        <Upload size={17} />
                        Upload {files.length}{" "} {files.length === 1 ? "File" : "Files"}

                    </>
                )}

            </button>
            </div>

        )}
    </div>
);
};

export default DashboardUpload;