import React from 'react'
import { stepsData } from '../assets/assets'
import {motion} from "framer-motion"

const Steps = () => {
  return (
    <motion.div
    initial={{opacity:0.2,y:200}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}} 
    >
      <h1 className='text-3xl font-semibold 
         mb-2 text-center'>How It Works</h1>
         <p className='text-gray-600 text-lg mb-8 text-center'>
           Transform your text into stunning images 
         </p>
<div className="w-full flex justify-center">
  <div className="w-full max-w-3xl space-y-4">
    {stepsData.map((item, index) => (
      <div
        key={index}
        className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-200
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <img
          src={item.icon}
          alt={item.title}
          className="w-10 h-10"
        />

        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            {item.title}
          </h2>

          <p className="mt-1 text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
    </motion.div>
  )
}

export default Steps
