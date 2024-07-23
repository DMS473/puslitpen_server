const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(decoded);
    if (req.user && req.user.role === 'admin') {
        console.log("hello");
        next();
      } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
      }
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};
