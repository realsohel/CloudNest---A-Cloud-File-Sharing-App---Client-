import React from "react";
import { Check, Copy, Link as LinkIcon, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const LinkShareModal = ({
        isOpen,
        onClose,
        link,
        title = "Share File",
    }) => {

    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);

            setCopied(true);

            setTimeout(() => {
            setCopied(false);
            }, 2000);

        } catch (error) {
            console.error("Failed to copy link:", error);
            toast.error("Failed to copy link:")
        }
    };

    return (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
    >
        {/* Background Overlay + Blur */}
        <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

            <h2 className="text-lg font-semibold text-gray-900">
            {title}
            </h2>

            <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            >
            <X size={20} />
            </button>

        </div>

        {/* Body */}
        <div className="px-6 py-6">

            <p className="text-gray-600 mb-5">
            Share this link with others to give them access to this file:
            </p>

            {/* Link Input */}
            <div className="flex items-center gap-2">

            <div className="relative flex-1">

                <LinkIcon
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                type="text"
                value={link}
                readOnly
                onFocus={(e) => e.target.select()}
                className="w-full pl-10 pr-3 py-3 border-2 border-purple-500 rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-purple-200"
                />

            </div>

            {/* Copy Button */}
            <button
                type="button"
                onClick={handleCopy}
                title={copied ? "Copied" : "Copy link"}
                className={`p-3 rounded-lg transition-colors ${
                copied
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
                {copied ? (
                <Check size={20} />
                ) : (
                <Copy size={20} />
                )}
            </button>

            </div>

            <p className="text-sm text-gray-500 mt-4">
            Anyone with this link can access this file.
            </p>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">

            <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
            Close
            </button>

            <button
            type="button"
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
            {copied ? (
                <>
                <Check size={17} />
                Copied
                </>
            ) : (
                <>
                <Copy size={17} />
                Copy
                </>
            )}
            </button>

        </div>

        </div>
    </div>
    );
};

export default LinkShareModal;