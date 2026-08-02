import React from 'react'
import { assets } from '../../assets/assets'

const Footer = ({footers}) => {
    return (
        <footer className="flex items-center justify-between gap-4 px-4 lg:px-44 bg-gray-800 py-3 ">
            <img src={assets.logo} alt="logo" width={60} />

            <p className="flex-1 border-l border-r px-2 text-white border-gray-100 max-sm:hidden font-semibold">
                &copy; {new Date().getFullYear()} Mohd Sohel Salmani | All rights reserved.
            </p>

            <div className="flex gap-3">
                {footers.map((foot, idx) => (
                    <a
                        key={idx}
                        href={foot.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={foot.logo} alt="social media" />
                    </a>
                ))}
            </div>

            <p className="text-center text-gray-700 font-medium"></p>
        </footer>
    )
}

export default Footer