import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://teximg-lovat.vercel.app'
  ],
  credentials: true
}))

app.use(express.json())

const startServer = async () => {
  try {
    await connectDB()

    app.use('/api/user', userRouter)
    app.use('/api/image', imageRouter)

    app.get('/', (req, res) => {
      res.send('API Working')
    })

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  } catch (error) {
    console.error('Failed to connect to DB:', error)
    process.exit(1)
  }
}

startServer()