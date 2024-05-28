import React from 'react'
import logo from "../assets/assets/5197500-ai (1).png"

import { FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";

export const Navbar = () => {
    return (

        <nav className='mb-20 flex items-center justify-between py-6'>

            <div className='flex flex-shrink-0 items-center'>
                <img className='mx-2 w-10' src={logo} alt='logo' />
            </div>
            <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
                <FaLinkedin/>
                <FaGithubSquare/>
                <FaTwitterSquare />

            </div>
        </nav>

    )
}
