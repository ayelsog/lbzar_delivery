const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) return res.status(401).json({ error: 'Accès non autorisé' })
  
  try {
    const decoded = jwt.verify(token, 'your-secret-key-here')
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ error: 'Token invalide ou expiré' })
  }
}

module.exports = { verifyToken }
