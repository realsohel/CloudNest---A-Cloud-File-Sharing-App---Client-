import React from 'react'

const HeroSection = ({openSignUp, openSignIn}) => {
    return (
        <div className="landing-page-content relative">
            <div className="absolute inset-0 bg-linear-to-r from-purple-100 to-indigo-50 opacity-80 z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
                <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-center text-gray-900 sm:text-5xl md:text-6xl mb-4">
                            <span className="block">Share Files Securely with </span>
                            <span className="block text-purple-500">CloudNest</span>
                        </h1>

                        <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
                            Share files seamlessly with your team and collaborators.
                        </p>

                        <div className="mt-10 flex justify-center">
                            <div className="grid w-full max-w-sm grid-cols-2 gap-4 sm:flex sm:w-auto">
                                <button 
                                    onClick={()=>openSignUp()}
                                    className="rounded-lg bg-purple-500 px-6 py-3 text-base font-medium text-white shadow-lg transition hover:bg-purple-600 hover:shadow-xl md:px-10 md:py-4 md:text-lg">
                                    Get Started
                                </button>

                                <button 
                                    onClick={()=>openSignIn()}
                                    className="rounded-lg bg-white px-6 py-3 text-base font-medium text-purple-500 shadow-lg transition hover:border hover:border-purple-500 hover:shadow-xl md:px-10 md:py-4 md:text-lg"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="relative">
                    <div className="aspect-w-16 rounded-lg shadow-lg overflow-hidden">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKhrJyodaaiFQY-bMkMlSG78LrtsIrrCcYRnfMb8xEw&s=10" alt="CloudNest Dashboard" className='w-full h-full object-cover'/>
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-black opacity-10 rounded-lg">

                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="mt-4 text-base text-gray-500">
                        All your files, accessible anywhere, anytime. Experience the power of secure and efficient file sharing with CloudNest.

                        All your files are encrypted and stored securely with enterprise-grade security measures, ensuring your data is safe and protected.
                    </p>
                </div>
                
            </div>
        </div>
    )
}

export default HeroSection
