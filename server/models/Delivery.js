const mongoose = require('mongoose')

const DeliverySchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['en cours', 'livrée', 'annulée'],
    default: 'en cours'
  },
  assignedTo: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.models.Delivery || mongoose.model('Delivery', DeliverySchema)
