import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

// ✅ FIX 2: specify frontend origin
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.use(express.json())

// ✅ FIX 1: wrap everything in async startServer function
const startServer = async () => {
  try {
    await connectDB() // ✅ now safely awaited inside async function

    app.use('/api/user', userRouter)
    app.use('/api/image', imageRouter)
    app.get('/', (req, res) => res.send("API Working"))

    app.listen(PORT, () => console.log('Server running on port ' + PORT)) // ✅ FIX 3: added space
  } catch (error) {
    console.error('Failed to connect to DB:', error)
    process.exit(1) // ✅ exit if DB fails to connect
  }
}

startServer()