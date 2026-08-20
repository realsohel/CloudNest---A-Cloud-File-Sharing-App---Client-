import React from "react";
import { X } from "lucide-react";

const Modal = ({
    isOpen,
    onClose,
    title = "Confirm Action",
    children,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    confirmationButtonClass = "bg-red-600 hover:bg-red-700",
    size = "sm",
    }) => {

    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
    };

    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        >
        {/* Background Blur + Overlay */}
        <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
        />

        {/* Modal */}
        <div
            className={`relative w-full ${sizeClasses[size]} bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
                {title}
            </h2>

            <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
            >
                <X size={20} />
            </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
            {children}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
                {cancelText}
            </button>

            <button
                type="button"
                onClick={onConfirm}
                className={`${confirmationButtonClass} px-4 py-2 rounded-lg text-white transition-colors `}
            >
                {confirmText}
            </button>
            </div>
        </div>
        </div>
    );
};

export default Modal;