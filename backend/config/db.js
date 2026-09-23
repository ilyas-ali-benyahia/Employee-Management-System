import mongoose from 'mongoose'

// This function's only job is to connect to the MongoDB database.
// It tells us whether it succeeded or failed.
export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`)
    process.exit(1) // stop the server if the database connection fails
  }
}
