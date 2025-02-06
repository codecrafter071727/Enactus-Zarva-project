const jwt = require('jsonwebtoken');

function restrictToLoggedinUserOnly(req, res, next) {
  const token = req.cookies.uid;
  
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, 'Zarva$123@$');
    req.user = verified;
    console.log(verified);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = restrictToLoggedinUserOnly;