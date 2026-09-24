import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function userResponse(user) {
  return { id: user._id, name: user.name, email: user.email }
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' })
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' })

    const normalizedEmail = email.toLowerCase().trim()
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) return res.status(409).json({ message: 'An account with this email already exists' })

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email: normalizedEmail, password: hashedPassword })
    res.status(201).json({ token: createToken(user._id.toString()), user: userResponse(user) })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'An account with this email already exists' })
    }
    res.status(400).json({ message: 'Could not create account', error: error.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email?.toLowerCase().trim() })
    const validPassword = user && await bcrypt.compare(password || '', user.password)
    if (!validPassword) return res.status(401).json({ message: 'Incorrect email or password' })

    res.json({ token: createToken(user._id.toString()), user: userResponse(user) })
  } catch (error) {
    res.status(500).json({ message: 'Could not log in', error: error.message })
  }
}

export function getCurrentUser(req, res) {
  res.json({ user: userResponse(req.user) })
}