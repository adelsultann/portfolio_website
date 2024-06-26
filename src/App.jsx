import React from 'react'
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Technologies } from './components/Technologies';
import { Experience } from './components/Experience';
import { Project } from './components/Project';
import {Contact} from "././components/Contact"
export const App = () => {
  return (
    // this is to able you to select any text and the background color will be as it shown here 
    <div className='overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900'>

      <div className='fixed top-0 -z-10 h-full w-full'>
        {/* this was taken from https://bg.ibelick.com/ good background */}

        <div className="absolute top-0 z-[-2] h-screen w-screen
       bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className='container mx-auto px-8'>
        <Navbar />
        <Hero />
        <AboutMe />
        <Technologies/>
        <Experience/>
        <Project/>
        <Contact />
      </div>

    </div>
  )
}

export default App;