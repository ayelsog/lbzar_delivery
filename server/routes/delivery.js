const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/auth')
const Delivery = require('../models/Delivery')

// Get assigned deliveries
router.get('/assigned', verifyToken, async (req, res) => {
  try {
    const deliveries = await Delivery.find({ assignedTo: req.user.id })
    res.json(deliveries)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes' })
  }
})

// Update delivery status
router.put('/:id/status', verifyToken, async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  
  try {
    const delivery = await Delivery.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
    
    if (!delivery) {
      return res.status(404).json({ error: 'Commande non trouvée' })
    }
    
    res.json(delivery)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut' })
  }
})

module.exports = router
