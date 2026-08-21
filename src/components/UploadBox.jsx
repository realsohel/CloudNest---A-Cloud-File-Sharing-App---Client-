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

const UploadBox = ({
    files,
    onFileChange,
    onUpload,
    uploading,
    onRemoveFile,
    remainingCredits,
    isUplaodDisabled,
    }) => {

    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);

        if (droppedFiles.length === 0) return;

        onFileChange({
        target: {
            files: droppedFiles,
        },
        });
    };

    const getFileIcon = (file) => {
        const extension = file.name
        .split(".")
        .pop()
        .toLowerCase();

        if (
        ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)
        ) {
        return <Image size={20} className="text-purple-500" />;
        }

        if (
        ["mp4", "webm", "mov", "avi", "mkv"].includes(extension)
        ) {
        return <Video size={20} className="text-blue-500" />;
        }

        if (
        ["mp3", "wav", "ogg", "flac", "m4a"].includes(extension)
        ) {
        return <Music size={20} className="text-green-500" />;
        }

        if (
        ["pdf", "doc", "docx", "txt", "rtf", "csv"].includes(extension)
        ) {
        return <FileText size={20} className="text-amber-500" />;
        }

        return <File size={20} className="text-gray-500" />;
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

    return (
        <div className="px-6 pb-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">
                <Upload size={22} className="text-blue-600" />

                <h2 className="text-xl font-medium text-gray-900">
                    Upload Files
                </h2>
                </div>

                <p className="text-sm text-gray-600">
                <span className="font-medium">
                    {remainingCredits}
                </span>{" "}
                credits remaining
                </p>

            </div>

            {/* Drop Zone */}
            <div
                onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
                }}
                onDragEnter={(e) => {
                e.preventDefault();
                setIsDragging(true);
                }}
                onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
                }}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
                className={`
                min-h-57.5
                border-2
                border-dashed
                rounded-xl
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                transition-all
                duration-200
                ${
                    isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/30"
                }
                `}
            >

                {/* Upload Icon */}
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <Upload
                        size={27}
                        className="text-blue-600"
                    />
                </div>

                <h3 className="text-lg font-medium text-gray-800">
                {isDragging
                    ? "Drop your files here"
                    : "Drag and drop files here"}
                </h3>

                <p className="text-gray-500 mt-1">
                or click to browse ({remainingCredits} credits remaining)
                </p>

                <input
                ref={fileInputRef}
                type="file"
                multiple
                hidden
                onChange={onFileChange}
                />

            </div>

            {/* Selected Files */}
            {files.length > 0 && (
                <div className="mt-6">

                    <div className="flex justify-between items-center mb-3">

                        <h3 className="font-medium text-gray-800">
                        Selected Files ({files.length})
                        </h3>

                        <span className="text-sm text-gray-500">
                        {remainingCredits} credits available
                        </span>

                    </div>

                    <div className="space-y-2">

                        {files.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                        >

                            <div className="flex items-center gap-3 min-w-0">

                                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                    {getFileIcon(file)}
                                </div>

                                <div className="min-w-0">

                                    <p
                                    title={file.name}
                                    className="text-sm font-medium text-gray-800 truncate"
                                    >
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
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFile(index);
                            }}
                            className="p-1.5 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                            title="Remove file"
                            >
                            <X size={18} />
                            </button>

                        </div>
                        ))}

                    </div>

                {/* Upload Button */}
                    <div className="flex justify-end mt-5">

                        <button
                        type="button"
                        disabled={isUplaodDisabled || uploading}
                        onClick={onUpload}
                        className={`
                            px-5 py-2.5
                            rounded-lg
                            flex
                            items-center
                            gap-2
                            font-medium
                            transition-all
                            ${
                            isUplaodDisabled || uploading
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }
                        `}
                        >

                        {uploading ? (
                            <>
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                            Uploading...
                            </>
                        ) : (
                            <>
                            <Upload size={18} />
                            Upload {files.length}{" "}
                            {files.length === 1 ? "File" : "Files"}
                            </>
                        )}

                        </button>

                    </div>

                </div>
            )}

        </div>
    );
};

export default UploadBox;