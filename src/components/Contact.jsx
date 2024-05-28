import React from 'react'
import {CONTACT} from "../assets/constants"
import { motion } from "framer-motion"

export const Contact = () => {
  return (
    <div className='border-b border-neutral-900 pb-4'>

         <motion.h2 
         className='my-20 text-center text-4xl'
        whileInView={{opacity:1,y:0}}
        initial={{y:-100, opacity:0}}
        transition={{duration:0.5}} 
        >
          Get in Touch

        </motion.h2>

        <div className='text-center bg-center tracking-tighter'>
            <p className='my-4'>{CONTACT.address}</p>
            <p className='my-4'>{CONTACT.phoneNo}</p>
            <a href='#'>{CONTACT.email}</a>
        </div>
    </div>
  )
}
