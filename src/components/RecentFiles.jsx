import React from "react";
import {
    File,
    FileText,
    Image,
    Music,
    Video,
    Clock,
} from "lucide-react";

const RecentFiles = ({ files = [] }) => {

    const getFileIcon = (file) => {

    const extension = file.name
        .split(".")
        .pop()
        .toLowerCase();


    if(["jpg", "jpeg", "png", "gif", "svg", "webp"] .includes(extension) ) {
        return ( 
            <Image size={20} className="text-purple-500"/>
        );
    }
    if( ["mp4", "webm", "mov", "avi", "mkv"] .includes(extension) ) {
        return (
            <Video size={20} className="text-blue-500" />
        );
    }


    if( ["mp3", "wav", "ogg", "flac", "m4a"].includes(extension)) {
        return (
        <Music size={20} className="text-green-500"/>
        );
    }

    if( ["pdf", "doc", "docx", "txt", "rtf", "csv"].includes(extension)) {
        return (
        <FileText size={20} className="text-amber-500" />
        );
    }

    return (
        <File size={20} className="text-gray-500" />
    );
};


    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(
            "en-IN",
            {
            day: "2-digit",
            month: "short",
            year: "numeric",
            }
        );
    };


    const formatSize = (bytes) => {
        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };


return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

    {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
            <div>
                <h2 className="font-semibold text-gray-900">
                    Recent Files
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Your latest uploaded files
                </p>
            </div>

            <Clock size={20} className="text-gray-400" />
        </div>


        {/* Files */}
        <div className="p-4">

            {files.length === 0 ? (
            <div className="text-center py-12">
                <File size={40} className="mx-auto text-gray-300" />
                <p className="text-gray-500 mt-3">
                    No files uploaded yet.
                </p>
            </div>

            ) : (

            <div className="space-y-2">
                {files.map((file) => (
                <div 
                    key={file.id}
                    className=" flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors "
                >

                    <div className="flex items-center gap-3 min-w-0">

                    <div className=" w-10 h-10 rounded-lg bg-gray-50 border flex items-center justify-center shrink-0">
                        {getFileIcon(file)}
                    </div>

                    <div className="min-w-0">
                        <p title={file.name}   className="text-sm font-medium text-gray-800 truncate">
                            {file.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            {formatSize(file.size)}
                            {" • "}
                            {formatDate(file.uploadedAt)}
                        </p>

                    </div>

                </div>


                <span className={` text-xs px-2 py-1 rounded-full ${file.isPublic? "bg-green-50 text-green-600": "bg-gray-100 text-gray-500"}`}>
                    {file.isPublic ? "Public": "Private"}
                </span>

            </div>
            ))}

            </div>

            )}
        </div>

    </div>
    );
};

export default RecentFiles;