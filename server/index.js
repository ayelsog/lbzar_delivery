const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const deliveryRoutes = require('./routes/delivery')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

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
app.use('/api/delivery', deliveryRoutes)

// Health check
app.get('/', (req, res) => {
  res.status(200).send('Lbzar Express API is running')
})

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A client connected')
  
  // Handle status update events
  socket.on('updateDeliveryStatus', async (data) => {
    try {
      const delivery = await Delivery.findByIdAndUpdate(
        data.id,
        { status: data.status },
        { new: true, runValidators: true }
      )
      
      if (delivery) {
        // Emit update to all connected clients
        io.emit('deliveryStatusUpdated', delivery)
        
        // Optional: Notify admin via console
        console.log(`Delivery ${data.id} status updated to ${data.status}`)
      }
    } catch (error) {
      console.error('Error updating delivery status:', error)
    }
  })
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected')
  })
})

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
