const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
  // Expect token in Authorization header as "Bearer <token>"
  const token = req.header('Authorization') ? req.header('Authorization').split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
