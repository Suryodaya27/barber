const jwt = require('jsonwebtoken');
const secretKey = "iamsurya";

const verifyToken = (req, res, next) => {
  // Retrieve the token from the request headers
   const authorizationHeader = req.headers.authorization;
   const token = authorizationHeader.replace('Bearer ', '');
   console.log(token);
  // const token = req.headers['x-auth-token'];
  // const token = require('../tokenGenerator')
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY4NTk3MDcyNH0.KmMkKkGHeVWHk9xcUKYVGq8qLJAX859zodaMxNhFC0k";
  if (!token) {
    res.status(401).send('Access denied. Token missing.');
    return;
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    console.log(decoded)
    next();
  } catch (err) {
    res.status(403).send('Invalid token.');
  }
};

module.exports = verifyToken;