

import React from 'react'
import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { DiMongodb } from "react-icons/di";
import { FaNodeJs } from "react-icons/fa";
import { motion } from "framer-motion"



const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});



export const Technologies = () => {
  return (
    <div className='border-b border-neutral-800 pb-24'>
        <h2 className='my-20 text-center text-4xl'>Technologies</h2>

{/* start of icons sections  */}
          <motion.div
                whileInView={{opacity:1,x:0}}
                initial={{x:-100, opacity:0}}
                transition={{duration:1.5}} 
                className='flex flex-wrap items-center justify-center gap-4'
                >



            <motion.div 
            className='rounded-2xl border-4 border-neutral-800 p-4'
            variants={iconVariants(2.5)}
            initial="initial"
            animate="animate"
            >
            <RiReactjsLine className='text-7xl text-cyan-400'/>
            </motion.div>

            <div className='flex flex-wrap items-center justify-center gap-4'>
            <motion.div 
             variants={iconVariants(3)}
             initial="initial"
             animate="animate"
            className='rounded-2xl border-4 border-neutral-800 p-4'
            >
            <TbBrandNextjs className='text-7xl text-white-400'/>
         </motion.div>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-4'>
        <motion.div 
             variants={iconVariants(5)}
             initial="initial"
             animate="animate"
            className='rounded-2xl border-4 border-neutral-800 p-4'
            >
            <DiMongodb  className='text-7xl text-green-500'/>
         </motion.div>
        </div>


        <div className='flex flex-wrap items-center justify-center gap-4'>
        <motion.div 
             variants={iconVariants(4)}
             initial="initial"
             animate="animate"
            className='rounded-2xl border-4 border-neutral-800 p-4'
            >
            <FaNodeJs  className='text-7xl text-red-500'/>
         </motion.div>
        </div>
         {/* end of icon section */}
        </motion.div>

        
       

    </div>
  )
}
