const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY || 'my super secret';

const isLoggedIn = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.indexOf('Bearer ') === 0) {
    res.sendStatus(401);
  } else {
    token = token.replace('Bearer ', '');
    try {
      req.user = jwt.verify(token, secret);
      next();
    } catch (e) {
      res.sendStatus(401);
    }
  }
};

const isAdmin = (req, res, next) => {
  // assumes user is on the request, so use
  // after authentication middleware
  if (req.user.roles.includes('admin')) {
    next();
  } else {
    res.sendStatus(403); // 403 Forbidden
  }
};

module.exports = { secret, isLoggedIn, isAdmin };
