const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body
  
  // Validate email format
  if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    return res.status(400).json({ error: 'Format d\'email invalide' })
  }
  
  // Validate password strength
  if (password.length < 8) {
    return res.status(400).json({ error: 'Mot de passe trop court (minimum 8 caractères)' })
  }
  
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: 'Email déjà utilisé' })
    }
    
    const user = new User({ email, password })
    await user.save()
    
    res.status(201).json({ message: 'Utilisateur créé avec succès' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'inscription' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' })
    }
    
    const isValid = await user.comparePassword(password)
    if (!isValid) {
      return res.status(401).json({ error: 'Identifiants invalides' }
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'your-secret-key-here',
      { expiresIn: '1h' }
    )
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      } 
    })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la connexion' })
  }
})

module.exports = router
