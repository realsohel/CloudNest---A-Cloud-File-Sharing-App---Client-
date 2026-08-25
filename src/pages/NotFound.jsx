import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import logo from "../assets/cloudNestLogo.png";

const NotFound = () => {
    return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="text-center max-w-lg">

        {/* Logo */}
        <div className="flex justify-center mb-6">
            <img src={logo} alt="CloudNest" className="w-24 h-24 object-contain"
            />
        </div>

        {/* Brand */}
        <h1 className="text-3xl font-bold text-gray-900">
            CloudNest
        </h1>

        {/* 404 */}
        <h2 className="text-7xl font-bold text-blue-600 mt-6">
            404
        </h2>

        {/* Heading */}
        <h3 className="text-2xl font-semibold text-gray-800 mt-4">
            Page Not Found
        </h3>

        {/* Information */}
        <p className="text-gray-500 mt-3 leading-relaxed">
            Sorry, the page you're looking for doesn't exist or may have
            been moved. Let's get you back to your CloudNest.
        </p>

        {/* Button */}
        <Link 
            to="/"
            className=" inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
            <Home size={18} />
            Back to Home
        </Link>

        </div>

    </div>
    );
};

export default NotFound;