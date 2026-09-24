import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import employeeRoutes from './routes/employeeRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config() // reads the .env file

const app = express()

// --- Middlewares ---
app.use(cors()) // allows the frontend (running on another port) to send requests to the backend
app.use(express.json()) // parses JSON sent in request bodies (POST/PUT)

// --- Routes ---
app.use('/api/employees', employeeRoutes)
app.use('/api/auth', authRoutes)

// Simple route to confirm the server is running
app.get('/', (req, res) => {
  res.send('🚀 northstar API is running')
})

const PORT = process.env.PORT || 5000

// Connect to the database, then start the server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Close the other server or change PORT in the .env file.`)
      process.exit(1)
    }
    throw error
  })
})
