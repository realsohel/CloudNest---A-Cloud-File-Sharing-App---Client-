import { Menu, Share2, Wallet, X } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import logo from "../assets/cloudNestLogo.png";
import { Link } from 'react-router-dom';
import { Show, UserButton } from '@clerk/react';
import SideMenu from './SideMenu';
import CreditDisplay from './CreditDisplay';
import { userCreditsContext } from '../context/UserCreditsContext';

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const {credits, fetchUserCredits} = useContext(userCreditsContext);

    useEffect(()=>{
        fetchUserCredits();
    },[fetchUserCredits])

    return (
        <div className='flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30 '>
            {/* Left side - Menu button & Title */}
            <div className="flex items-center gap-5">
                <button 
                    onClick={()=>setOpenSideMenu(!openSideMenu)}
                    className='block lg:hidden text-black hover::bg-gray-100 p-1 rounded transition-colors'>
                        {openSideMenu ? (
                            <X className='text-2xl'/>
                        ):( 
                            <Menu className='text-2xl'/>
                        )}
                </button>

                <div className="flex items-center gap-2">
                    <img src={logo} alt="" width={60}/>
                    <span className='text-lg font-bold text-black truncate'>
                        CLoud Nest
                    </span> 
                </div>
            </div>
            {/* Right side - Credits and User Button */}
            
            <Show when="signed-in">
                <div className="flex items-center gap-4">
                    <Link to="/subscription">
                        <CreditDisplay credits={credits}/>
                    </Link>

                    <div className="">
                        <UserButton/>
                    </div>
                </div>
            </Show>
            

            {/* Mobile side-menu */}
            {openSideMenu && (
                <div className="fixed top-18.25 left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20">
                    {/* Side Menu bar */}
                    <SideMenu activeMenu={activeMenu}/>
                </div>
            )}
            
        </div>
    )
}

export default Navbar
