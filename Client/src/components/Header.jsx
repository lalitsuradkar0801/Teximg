import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import {motion} from "framer-motion"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const Header = () => {

  const {user,setShowLogin} =useContext(AppContext)
  const navigate= useNavigate()
  const onClickHandler =()=>{
    if(user){
      navigate('/result')
    }else{
     setShowLogin(true) 
    }
  }
  return (
    <motion.div className='flex flex-col justify-center items-center
     text-center my-20'
    initial={{opacity:0.2,y:200}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}   
     
     >
      <motion.div className='flex items-center gap-2
      bg-white px-6 py-1 rounded-full border border-neutral-300'
        initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.2 ,duration:1}}
      
      >
        <p>Best text to image generator</p>
      <img src={assets.star_icon} alt='' />
      </motion.div>

        <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl 
        sm:max-w-[590px] mx-auto mt-10 text-center'>
          Turn text to <span className='text-blue-600'
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.4 ,duration:2}}
          >image</span>, in seconds.
        </motion.h1>
        <motion.p className='text-center text-gray-500
         mx-auto mt-6 max-w-[800px] text-sm sm:text-base'
         initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{delay:0.6 ,duration:0.8}}>
          Create high-quality AI-generated images from simple text prompts in seconds. Fast, creative, and effortless.  
        </motion.p>
        <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-black
        w-auto mt-8  px-12 py-2.5 rounded-full 
        flex items-center gap-2'
                whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{default:{duration:0.5},
           opacity: {delay:0.8 ,duration:1}}}>

          Generate Images
          <img className='h-6' src={assets.star_group} alt='' />
        </motion.button>
    
    <div className='flex flex-wrap justify-center gap-3 mt-16'>
        {Array(6).fill('').map((item, index) => (
            <img className='rounded hover:scale-105 
            transition duration-300 cursor-pointer max-sm:w-10'
             src={index %2 === 0 ? assets.sample_img_2 : 
             assets.sample_img_1} 
             alt=''key={index} width={70} />
        ))}
    </div>
    <p className=' text-sm mt-4'>Generated Images from Teximg</p>
    </motion.div>
  )
}

export default Header
