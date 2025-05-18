const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')

const app = express()
const PORT = process.env.EXPRESS_PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected')
}).catch(err => {
  console.error('MongoDB connection error:', err)
})

// Routes
app.use('/api/auth', authRoutes)

// Health check
app.get('/', (req, res) => {
  res.status(200).send('Lbzar Express API is running')
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
