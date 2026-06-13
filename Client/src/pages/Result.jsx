import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"
import { AppContext } from '../context/AppContext'

const Result = () => {

  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!input.trim()) return

    setLoading(true)
    setIsImageLoaded(false)

    try {
      const generatedImage = await generateImage(input)

      if (generatedImage) {
        setImage(generatedImage)
        setIsImageLoaded(true)
      }
    } catch (error) {
      console.error('Image generation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateAnother = () => {
    setIsImageLoaded(false)
    setImage(assets.sample_img_1)
    setInput('')
  }

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] items-center justify-center mt-10'
    >

      {/* Image Display */}
      <div className='relative'>
        <img
          src={image}
          alt='Generated'
          className='max-w-sm rounded shadow-md'
        />

        {/* Loading bar at bottom of image */}
        <span
          className={`absolute bottom-0 left-0 h-1 bg-blue-500 rounded-bl
            ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}
        />
      </div>

      {/* Loading text */}
      {loading && (
        <p className='mt-3 text-gray-500 text-sm'>Generating your image, please wait...</p>
      )}

      {/* Input Box — shown when image is NOT loaded */}
      {!isImageLoaded && (
        <div className='flex w-full max-w-xl bg-neutral-500 text-white rounded-full mt-10 text-sm p-0.5'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Describe what you want to generate...'
            className='flex-1 bg-transparent outline-none ml-5 max-sm:w-20 placeholder:text-white'
            disabled={loading}
          />
          <button
            type='submit'
            disabled={loading}
            className={`text-white px-10 sm:px-16 py-3 rounded-full transition-all duration-300
              ${loading
                ? 'bg-zinc-400 cursor-not-allowed'
                : 'bg-zinc-900 hover:bg-blue-600 cursor-pointer'
              }`}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      )}

      {/* Download & Generate Another — shown when image IS loaded */}
      {isImageLoaded && !loading && (
      <div className="flex gap-3 flex-wrap justify-center mt-10">
  <button
    type="button"
    onClick={handleGenerateAnother}
    className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-300"
  >
    Generate Another
  </button>

  <a
    href={image}
    download="generated-image.png"
    className="bg-zinc-900 text-white px-10 py-3 rounded-full cursor-pointer hover:bg-blue-600 transition-all duration-300"
  >
    Download
  </a>
</div>
      )}

    </motion.form>
  )
}

export default Result